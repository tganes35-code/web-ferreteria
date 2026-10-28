<?php

namespace App\Services;

use RuntimeException;

class FileContactStore
{
    public function append(array $entry): void
    {
        $path = storage_path('app/private/contacts.json');
        $directory = dirname($path);
        if (! is_dir($directory) && ! mkdir($directory, 0755, true) && ! is_dir($directory)) {
            throw new RuntimeException('No se pudo preparar el almacenamiento de contactos.');
        }

        $handle = fopen($path, 'c+');
        if ($handle === false || ! flock($handle, LOCK_EX)) {
            throw new RuntimeException('No se pudo guardar el contacto.');
        }

        try {
            $contents = stream_get_contents($handle);
            $entries = $contents === '' ? [] : json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
            if (! is_array($entries)) {
                throw new RuntimeException('El almacenamiento de contactos tiene un formato inválido.');
            }
            $entries[] = $entry;
            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, json_encode($entries, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }
}
