<?php

namespace App\Services;

use RuntimeException;

class FileNewsletterStore
{
    public function subscribe(string $email): void
    {
        $path = storage_path('app/private/newsletter.json');
        $directory = dirname($path);
        if (! is_dir($directory) && ! mkdir($directory, 0755, true) && ! is_dir($directory)) {
            throw new RuntimeException('No se pudo preparar el almacenamiento de suscripciones.');
        }

        $handle = fopen($path, 'c+');
        if ($handle === false || ! flock($handle, LOCK_EX)) {
            throw new RuntimeException('No se pudo guardar la suscripción.');
        }

        try {
            $contents = stream_get_contents($handle);
            $emails = $contents === '' ? [] : json_decode($contents, true, 512, JSON_THROW_ON_ERROR);
            if (! is_array($emails)) {
                throw new RuntimeException('El almacenamiento de suscripciones tiene un formato inválido.');
            }
            $email = strtolower(trim($email));
            if (! in_array($email, $emails, true)) {
                $emails[] = $email;
                rewind($handle);
                ftruncate($handle, 0);
                fwrite($handle, json_encode($emails, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_THROW_ON_ERROR));
            }
        } finally {
            flock($handle, LOCK_UN);
            fclose($handle);
        }
    }
}
