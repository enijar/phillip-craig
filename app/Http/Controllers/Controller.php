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
        request()->merge($this->getCleanInput());

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

    private function getCleanInput(): array
    {
        $input = request()->all();
        if (isset($input['email'])) {
            $input['email'] = $this->cleanEmail($input['email']);
        }
        return $input;
    }

    /**
     * Prevent duplicate emails, that support the "+" postfix,
     * e.g. example@gmail.com ~ example+1@gmail.com
     *
     * @param string $email
     * @return string
     */
    private function cleanEmail(string $email): string
    {
        $parts = explode('@', $email);

        // check if there is a "+" and return the string before
        $beforePlus = strstr($parts[0], '+', true);
        $beforeAt = $beforePlus ? $beforePlus : $parts[0];

        // remove "."
        $beforeAt = str_replace('.', '', $beforeAt);

        return "{$beforeAt}@{$parts[1]}";
    }
}
