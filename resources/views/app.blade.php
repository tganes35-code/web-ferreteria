<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta name="description" content="Ferretería La Rebaja: herramientas, materiales de construcción, plomería, electricidad y soluciones para tus proyectos en Ibagué.">
    <meta property="og:type" content="website">
    <meta property="og:title" content="Ferretería La Rebaja">
    <meta property="og:description" content="Todo en herramientas para construir tus sueños.">
    <meta property="og:image" content="{{ asset('images/logo.jpg') }}">
    <meta property="og:url" content="{{ url()->current() }}">
    <link rel="icon" type="image/jpeg" href="{{ asset('images/logo.jpg') }}">
    <title>Ferretería La Rebaja | Todo para construir tus sueños</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>