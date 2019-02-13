<!DOCTYPE html>

<html lang="en">
<head>
    @if (env('APP_ENV') === 'production')
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-134347854-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];

            function gtag() {
                dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'UA-134347854-1');
        </script>
    @endif
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge, chrome=1"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
    <meta name="keywords" content="fashion, clothing"/>
    <meta name="subtitle" content="Your go-to Innovative agency for all things digital"/>
    <meta name="description" content="Fashion."/>

    <meta property="og:image" content="{{ asset('img/share.jpg') }}"/>
    <meta property="og:title" content="Finer Vision"/>
    <meta property="og:description" content="Fashion."/>
    <meta property="og:url" content="https://finervision.com"/>

    <meta name="twitter:card" content="summary_large_image"/>
    <meta property="twitter:image" content="{{ asset('img/share.jpg' }}"/>
    <meta property="twitter:title" content="Finer Vision"/>
    <meta property="twitter:description" content="Fashion."/>
    <meta property="twitter:url" content="https://finervision.com"/>

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
            reCaptchaSiteKey: '{{ env('RECAPTCHA_SITE_KEY') }}',
        };
    </script>
</head>
<body>
<div id="root-app"></div>
<script src="{{ asset("dist/app.js?v={$version}") }}"></script>
@if (env('APP_ENV') === 'production')
    <script src="//rum-static.pingdom.net/pa-5c631abccea07b0016000ba4.js" async></script>
@endif
</body>
</html>
