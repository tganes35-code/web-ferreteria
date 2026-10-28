<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class PromotionController extends Controller
{
    public function index()
    {
        $products = collect(config('store.products'))
            ->filter(fn ($p) => !empty($p['is_offer']))
            ->values();

        return Inertia::render('Promotions/Index', [
            'products' => $products,
        ]);
    }
}
