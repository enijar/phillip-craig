<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Cache;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function __construct()
    {
        $version = Cache::remember('version', 5, function () {
            return trim(shell_exec('git rev-parse --short HEAD'));
        });

        $routes = [];
        foreach (app()->routes->getRoutes() as $route) {
            $name = $route->getName();
            if (!is_null($name)) {
                $routes[$name] = "/{$route->uri}";
            }
        }

        view()->share(compact('routes', 'version'));
    }
}
