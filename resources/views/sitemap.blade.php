<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
@foreach ($urls as $url)
    <url><loc>{{ rtrim(url('/'), '/') . $url }}</loc></url>
@endforeach
</urlset>