<?php

namespace App\Providers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\ServiceProvider;

class ValidatorServiceProvider extends ServiceProvider
{
    /**
     * Register any validator services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any validator services.
     *
     * @return void
     */
    public function boot()
    {
        Validator::extend('recaptcha', 'App\\PhillipCraig\\Validators\\ReCaptcha@validate');
    }
}
