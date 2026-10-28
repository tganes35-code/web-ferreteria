<?php

namespace App\Http\Controllers;

use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = config('store.categories');

        return Inertia::render('Categories/Index', [
            'categories' => $categories,
        ]);
    }
}
