<?php

namespace App\Services;

use RuntimeException;

class FileOrderStore
{
    private function path(): string
    {
        return storage_path('app/private/orders.json');
    }

    public function append(array $order): void
    {
        $path = $this->path();
        $directory = dirname($path);

        if (! is_dir($directory) && ! mkdir($directory, 0755, true) && ! is_dir($directory)) {
            throw new RuntimeException('No se pudo preparar el almacenamiento de pedidos.');
        }

        $handle = fopen($path, 'c+');
        if ($handle === false || ! flock($handle, LOCK_EX)) {
            throw new RuntimeException('No se pudo guardar el pedido.');
        }

        try {
            $contents = stream_get_contents($handle);
            try {
                $orders = $contents === '' ? [] : json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
            } catch (\JsonException $exception) {
                $backup = $path . '.corrupt-' . now()->format('YmdHis');
                file_put_contents($backup, $contents, LOCK_EX);
                throw new RuntimeException('El almacenamiento de pedidos está dañado. Se creó una copia de respaldo.', 0, $exception);
            }
            if (! is_array($orders)) {
                throw new RuntimeException('El almacenamiento de pedidos tiene un formato inválido.');
            }
            $orders[] = $order;
            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }

    public function all(): array
    {
        $path = $this->path();
        if (! is_file($path)) {
            return [];
        }

        $orders = json_decode((string) file_get_contents($path), true);
        if (! is_array($orders)) {
            throw new RuntimeException('El almacenamiento de pedidos tiene un formato inválido.');
        }

        return $orders;
    }

    public function find(string $number): ?array
    {
        return collect($this->all())->firstWhere('number', $number);
    }

    public function updateStatus(string $number, string $status): ?array
    {
        $path = $this->path();
        $directory = dirname($path);
        if (! is_dir($directory) && ! mkdir($directory, 0755, true) && ! is_dir($directory)) {
            throw new RuntimeException('No se pudo preparar el almacenamiento de pedidos.');
        }

        $handle = fopen($path, 'c+');
        if ($handle === false || ! flock($handle, LOCK_EX)) {
            throw new RuntimeException('No se pudo actualizar el pedido.');
        }

        try {
            $contents = stream_get_contents($handle);
            $orders = $contents === '' ? [] : json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
            $index = collect($orders)->search(fn ($order) => ($order['number'] ?? null) === $number);
            if ($index === false) {
                return null;
            }
            $orders[$index]['status'] = $status;
            $orders[$index]['updated_at'] = now()->toIso8601String();
            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, json_encode($orders, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));

            return $orders[$index];
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }
}
