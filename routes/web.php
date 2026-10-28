<?php

use App\Http\Controllers\AboutController;
use App\Http\Controllers\AdminOrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\CatalogController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NewsletterController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\PromotionController;
use Illuminate\Support\Facades\Route;

Route::get('/', HomeController::class)->name('home');
Route::get('/catalogo', [CatalogController::class, 'index'])->name('catalog.index');
Route::get('/producto/{slug}', [ProductController::class, 'show'])->name('product.show');
Route::get('/categorias', [CategoryController::class, 'index'])->name('categories.index');
Route::get('/promociones', [PromotionController::class, 'index'])->name('promotions.index');
Route::get('/nosotros', [AboutController::class, 'index'])->name('about.index');
Route::get('/contacto', [ContactController::class, 'index'])->name('contact.index');
Route::post('/contacto', [ContactController::class, 'store'])->name('contact.store')->middleware('throttle:5,1');
Route::get('/carrito', [CartController::class, 'index'])->name('cart.index');
Route::get('/robots.txt', function () {
    return response("User-agent: *\nDisallow:\n\nSitemap: ".url('/sitemap.xml')."\n")
        ->header('Content-Type', 'text/plain');
});

Route::post('/pedidos', [OrderController::class, 'store'])->name('orders.store')->middleware('throttle:10,1');
Route::post('/newsletter', [NewsletterController::class, 'store'])->name('newsletter.store')->middleware('throttle:3,1');
Route::middleware('throttle:30,1')->group(function () {
    Route::get('/admin/pedidos', [AdminOrderController::class, 'index'])->name('admin.orders.index');
    Route::get('/admin/pedidos/exportar', [AdminOrderController::class, 'export'])->name('admin.orders.export');
    Route::get('/admin/pedidos/{number}', [AdminOrderController::class, 'show'])->name('admin.orders.show');
    Route::patch('/admin/pedidos/{number}', [AdminOrderController::class, 'updateStatus'])->name('admin.orders.status');
});

Route::get('/sitemap.xml', function () {
    $urls = collect(['/', '/catalogo', '/categorias', '/promociones', '/nosotros', '/contacto', '/carrito'])
        ->merge(collect(config('store.products'))->pluck('slug')->map(fn ($slug) => "/producto/{$slug}"));
    return response()->view('sitemap', compact('urls'))->header('Content-Type', 'application/xml');
});
