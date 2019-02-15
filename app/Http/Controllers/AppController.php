<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Cache;

class AppController extends Controller
{
    public function app()
    {
        return Cache::remember('view.app', 525600, function () {
            return view('app')->render();
        });
    }
}
