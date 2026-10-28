<?php

namespace App\Http\Controllers;

use App\Services\FileNewsletterStore;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class NewsletterController extends Controller
{
    public function store(Request $request, FileNewsletterStore $newsletter): JsonResponse
    {
        $email = $request->validate(['email' => ['required', 'email', 'max:180']])['email'];
        $newsletter->subscribe($email);

        return response()->json(['message' => 'Suscripción registrada correctamente.'], 201);
    }
}
