<!DOCTYPE html>

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <title>Phillip Craig</title>
    <link rel="stylesheet" href="{{ asset("dist/app.css?v={$version}") }}">

    <base href="{{ url('/') }}">

    <script>
        window.APP = {
            url: '{{ url('/') }}',
            env: {
                APP_ENV: '{{ env('APP_ENV') }}',
                APP_DEBUG: '{{ env('APP_DEBUG') }}' === '1',
            },
            routes: JSON.parse('{!! json_encode($routes, JSON_HEX_QUOT|JSON_HEX_APOS) !!}'),
            version: '{{ $version }}',
            cdn: '{{ env('CDN_URL') }}',
        };
    </script>
</head>

<body>
<div id="root-app"></div>
<script src="{{ asset("dist/app.js?v={$version}") }}"></script>
<script src="//rum-static.pingdom.net/pa-5c631abccea07b0016000ba4.js" async></script>
</body>
</html>
