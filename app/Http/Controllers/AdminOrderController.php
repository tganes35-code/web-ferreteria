<?php

namespace App\Http\Controllers;

use App\Services\FileOrderStore;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOrderController extends Controller
{
    private function authorize(Request $request): void
    {
        $configuredToken = (string) config('services.store.admin_token');
        $providedToken = (string) $request->header('X-Admin-Token', '');
        abort_if($configuredToken === '' || $providedToken === '' || ! hash_equals($configuredToken, $providedToken), Response::HTTP_FORBIDDEN);
    }

    public function index(Request $request, FileOrderStore $orders)
    {
        $this->authorize($request);

        return response()->json(['orders' => $orders->all()]);
    }

    public function show(Request $request, string $number, FileOrderStore $orders)
    {
        $this->authorize($request);
        $order = $orders->find($number);
        abort_unless($order, 404);

        return response()->json(['order' => $order]);
    }

    public function updateStatus(Request $request, string $number, FileOrderStore $orders)
    {
        $this->authorize($request);
        $status = $request->validate(['status' => ['required', 'in:pendiente,confirmado,en preparación,enviado,entregado,cancelado']])['status'];
        $order = $orders->updateStatus($number, $status);
        abort_unless($order, 404);

        return response()->json(['order' => $order]);
    }

    public function export(Request $request, FileOrderStore $orders)
    {
        $this->authorize($request);

        return response()->streamDownload(function () use ($orders): void {
            $handle = fopen('php://output', 'w');
            fputcsv($handle, ['number', 'created_at', 'status', 'customer_name', 'customer_phone', 'total']);
            foreach ($orders->all() as $order) {
                fputcsv($handle, [
                    $order['number'] ?? '',
                    $order['created_at'] ?? '',
                    $order['status'] ?? '',
                    $order['customer']['name'] ?? '',
                    $order['customer']['phone'] ?? '',
                    $order['total'] ?? 0,
                ]);
            }
            fclose($handle);
        }, 'pedidos.csv', ['Content-Type' => 'text/csv; charset=UTF-8']);
    }
}