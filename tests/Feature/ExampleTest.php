<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    protected function tearDown(): void
    {
        @unlink(storage_path('app/private/orders.json'));
        @unlink(storage_path('app/private/contacts.json'));
        @unlink(storage_path('app/private/newsletter.json'));

        parent::tearDown();
    }

    /**
     * A basic test example.
     */
    public function test_the_application_returns_a_successful_response(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_production_content_security_policy_allows_google_fonts(): void
    {
        $this->app->instance('env', 'production');

        $response = $this->get('/');

        $response->assertOk();
        $contentSecurityPolicy = $response->headers->get('Content-Security-Policy');
        $this->assertNotNull($contentSecurityPolicy);
        $this->assertStringContainsString("style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", $contentSecurityPolicy);
        $this->assertStringContainsString("font-src 'self' data: https://fonts.gstatic.com", $contentSecurityPolicy);
    }

    public function test_catalog_and_invalid_product_routes_are_available(): void
    {
        $this->get('/catalogo')->assertOk();
        $this->get('/producto/no-existe')->assertNotFound();
    }

    public function test_removed_products_are_not_available_or_recommended(): void
    {
        $removedIds = [4, 5, 6, 7, 8, 9];
        $removedSlugs = [
            'caja-de-herramientas-19-stanley',
            'mezcla-para-concreto-40kg-pacasmayo',
            'pintura-vinilo-tipo-1-galon-pintuco',
            'tubo-pvc-sanitario-3-x-6m-pavco',
            'juego-de-llaves-combinadas-8-a-19mm-truper',
            'casco-de-seguridad-tipo-1-clase-e-truper',
        ];
        $products = config('store.products');

        $this->assertSame([], array_values(array_filter(
            $products,
            fn (array $product) => in_array($product['id'], $removedIds, true)
        )));

        foreach ($products as $product) {
            $this->assertSame(
                [],
                array_values(array_intersect($removedIds, $product['compatible_product_ids'] ?? []))
            );
        }

        foreach ($removedSlugs as $slug) {
            $this->get('/producto/' . $slug)->assertNotFound();
        }
    }

    public function test_catalog_filters_by_category_and_sorts_newest_first(): void
    {
        $response = $this->get('/catalogo?category=herramientas-electricas&sort=newest');

        $response->assertOk();
        $products = $response->viewData('page')['props']['products']['data'];
        $this->assertNotEmpty($products);
        $this->assertSame('herramientas-electricas', $products[0]['category']['slug']);
        $this->assertGreaterThanOrEqual($products[array_key_last($products)]['id'], $products[0]['id']);
    }

    public function test_an_order_uses_the_catalog_price_and_returns_a_whatsapp_url(): void
    {
        $response = $this->postJson('/pedidos', [
            'customer' => [
                'name' => 'Ana Pérez',
                'phone' => '3001234567',
                'email' => 'ana@example.com',
                'address' => 'Calle 1 # 2-3',
            ],
            'items' => [['product_id' => 1, 'quantity' => 2]],
        ]);

        $price = config('store.products.0.sale_price') ?? config('store.products.0.price');
        $response->assertCreated()
            ->assertJsonPath('order.total', $price * 2)
            ->assertJsonPath('order.number', fn (string $number) => str_starts_with($number, 'FLR-'))
            ->assertJsonPath('whatsapp_url', fn (string $url) => str_starts_with($url, 'https://wa.me/'));
    }

    public function test_an_order_rejects_unknown_products(): void
    {
        $this->postJson('/pedidos', [
            'customer' => ['name' => 'Ana Pérez', 'phone' => '3001234567', 'address' => 'Calle 1 # 2-3'],
            'items' => [['product_id' => 9999, 'quantity' => 1]],
        ])->assertUnprocessable()->assertJsonValidationErrors('items.0.product_id');
    }

    public function test_catalog_searches_by_sku_and_filters_offers(): void
    {
        $response = $this->get('/catalogo?search=DWD024K&on_sale=1');

        $response->assertOk();
        $products = $response->viewData('page')['props']['products']['data'];
        $this->assertCount(1, $products);
        $this->assertSame('DWD024K', $products[0]['sku']);
    }

    public function test_contact_and_newsletter_are_saved_without_a_database(): void
    {
        $this->postJson('/contacto', [
            'name' => 'Ana Pérez',
            'email' => 'ana@example.com',
            'subject' => 'Cotización',
            'message' => 'Necesito una cotización.',
        ])->assertCreated();

        $this->postJson('/newsletter', ['email' => 'ana@example.com'])->assertCreated();
        $this->postJson('/newsletter', ['email' => 'ANA@example.com'])->assertCreated();

        $this->assertCount(1, json_decode(file_get_contents(storage_path('app/private/newsletter.json')), true));
        $this->assertFileExists(storage_path('app/private/contacts.json'));
    }

    public function test_admin_orders_require_token_and_can_change_status(): void
    {
        config(['services.store.admin_token' => 'local-test-token']);
        $this->postJson('/pedidos', [
            'customer' => ['name' => 'Ana Pérez', 'phone' => '3001234567', 'address' => 'Calle 1 # 2-3'],
            'items' => [['product_id' => 1, 'quantity' => 1]],
        ])->assertCreated();

        $this->getJson('/admin/pedidos')->assertForbidden();
        $this->getJson('/admin/pedidos?token=local-test-token')->assertForbidden();
        $orders = $this->withHeader('X-Admin-Token', 'local-test-token')->getJson('/admin/pedidos')->assertOk();
        $number = $orders->json('orders.0.number');
        $this->withHeader('X-Admin-Token', 'local-test-token')
            ->patchJson('/admin/pedidos/' . $number, ['status' => 'confirmado'])
            ->assertOk()
            ->assertJsonPath('order.status', 'confirmado');
    }
}
