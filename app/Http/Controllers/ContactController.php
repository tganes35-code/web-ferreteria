<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Services\FileContactStore;
use Illuminate\Http\JsonResponse;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact/Index');
    }

    public function store(StoreContactRequest $request, FileContactStore $contacts): JsonResponse
    {
        $contacts->append([
            ...$request->validated(),
            'created_at' => now()->toIso8601String(),
        ]);

        return response()->json(['message' => 'Mensaje recibido correctamente.'], 201);
    }
}
