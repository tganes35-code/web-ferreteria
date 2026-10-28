<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Str;

class CatalogController extends Controller
{
    public function index(Request $request)
    {
        $store = config('store');
        $allowedSorts = ['relevance', 'price_asc', 'price_desc', 'newest'];
        $sort = in_array($request->input('sort'), $allowedSorts, true) ? $request->input('sort') : 'relevance';
        $products = collect($store['products'])
            ->when($request->filled('search'), function ($items) use ($request) {
                $search = Str::lower($request->input('search'));

                return $items->filter(fn ($product) => Str::contains(Str::lower(implode(' ', [
                    $product['name'],
                    $product['sku'] ?? '',
                    $product['description'] ?? '',
                    $product['brand']['name'] ?? '',
                    $product['category']['name'] ?? '',
                ])), $search));
            })
            ->when($request->filled('category'), fn ($items) => $items->filter(fn ($product) => $product['category']['slug'] === $request->input('category')))
            ->when($request->filled('brand'), fn ($items) => $items->filter(fn ($product) => $product['brand']['slug'] === $request->input('brand')))
            ->when($request->filled('min_price'), fn ($items) => $items->filter(fn ($product) => ($product['sale_price'] ?? $product['price']) >= (float) $request->input('min_price')))
            ->when($request->filled('max_price'), fn ($items) => $items->filter(fn ($product) => ($product['sale_price'] ?? $product['price']) <= (float) $request->input('max_price')))
            ->when($request->boolean('in_stock'), fn ($items) => $items->filter(fn ($product) => $product['stock'] > 0))
            ->when($request->boolean('backorder'), fn ($items) => $items->filter(fn ($product) => ($product['stock_type'] ?? null) === 'backorder'))
            ->when($request->boolean('on_sale'), fn ($items) => $items->filter(fn ($product) => ! empty($product['is_offer'])));

        if ($sort === 'price_asc') $products = $products->sortBy(fn ($product) => $product['sale_price'] ?? $product['price']);
        if ($sort === 'price_desc') $products = $products->sortByDesc(fn ($product) => $product['sale_price'] ?? $product['price']);
        if ($sort === 'newest') $products = $products->sortByDesc('id');
        $products = $products->values();
        $page = LengthAwarePaginator::resolveCurrentPage();
        $products = new LengthAwarePaginator($products->forPage($page, 24)->values(), $products->count(), 24, $page, ['path' => $request->url(), 'query' => $request->query()]);

        return Inertia::render('Catalog/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'category', 'brand', 'min_price', 'max_price', 'in_stock', 'backorder', 'on_sale', 'sort']),
            'categories' => $store['categories'],
            'brands' => $store['brands'],
        ]);
    }
}
