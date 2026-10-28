<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOrderRequest;
use App\Services\FileOrderStore;
use Illuminate\Http\JsonResponse;

class OrderController extends Controller
{
    public function store(StoreOrderRequest $request, FileOrderStore $orders): JsonResponse
    {
        $payload = $request->validated();
        $products = collect(config('store.products'))->keyBy('id');
        $lines = [];
        $total = 0;
        foreach ($payload['items'] as $item) {
            $product = $products->get($item['product_id']);
            abort_unless($product && $product['stock'] >= $item['quantity'], 422, 'Producto agotado o cantidad no disponible.');
            $unitPrice = $product['sale_price'] ?? $product['price'];
            $total += $unitPrice * $item['quantity'];
            $lines[] = "- {$product['name']} x{$item['quantity']} ($" . number_format($unitPrice * $item['quantity'], 0, ',', '.') . ')';
        }
        $number = 'FLR-' . now()->format('YmdHis') . '-' . random_int(100, 999);
        $customerDetails = "\nNombre: {$payload['customer']['name']}\nTeléfono: {$payload['customer']['phone']}\nDirección: {$payload['customer']['address']}";
        if (! empty($payload['customer']['email'])) {
            $customerDetails .= "\nCorreo: {$payload['customer']['email']}";
        }
        $message = "Hola, Ferretería La Rebaja. Quiero confirmar el pedido {$number}:\n" . implode("\n", $lines) . "\nTotal: $" . number_format($total, 0, ',', '.') . $customerDetails;
        $orders->append([
            'number' => $number,
            'created_at' => now()->toIso8601String(),
            'customer' => $payload['customer'],
            'items' => $payload['items'],
            'total' => $total,
            'status' => 'pendiente',
        ]);

        return response()->json([
            'order' => ['number' => $number, 'total' => $total],
            'whatsapp_url' => 'https://wa.me/' . config('services.store.whatsapp', '573152987887') . '?text=' . rawurlencode($message),
        ], 201);
    }
}
