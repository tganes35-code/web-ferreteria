<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class HomeController extends Controller
{
    public function __invoke()
    {
        $store = config('store');

        return Inertia::render('Home', [
            'featuredProducts' => collect($store['products'])->where('is_featured', true)->take(10)->values()->all(),
            'categories' => $store['categories'],
        ]);
    }
}
