<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class ProductController extends Controller
{
    public function show(string $slug)
    {
        $product = collect(config('store.products'))->firstWhere('slug', $slug);
        abort_unless($product, 404);
        $products = collect(config('store.products'))->keyBy('id');
        $relatedProducts = collect($product['compatible_product_ids'] ?? [])
            ->map(fn ($id) => $products->get($id))
            ->filter()
            ->values();

        if ($relatedProducts->isEmpty()) {
            $relatedProducts = collect(config('store.products'))
                ->filter(fn ($candidate) => $candidate['id'] !== $product['id'] && $candidate['category']['slug'] === $product['category']['slug'])
                ->take(4)
                ->values();
        }

        return Inertia::render('Product/Show', [
            'product' => [
                ...$product,
            ],
            'relatedProducts' => $relatedProducts->all(),
        ]);
    }
}
