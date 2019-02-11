<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\PhillipCraig\Entities\Subscription;
use App\PhillipCraig\Http\JsonResponse;

class SubscriptionController extends Controller
{
    public function subscribe()
    {
        $validation = JsonResponse::validate([
            'email' => 'required|email|unique:subscriptions,email,max:255',
        ], [
            'email.required' => 'Enter your email',
            'email.email' => 'Enter a valid email',
            'email.unique' => "You've already subscribed with that email",
            'max.email' => 'Email too long, make it 255 or less characters',
        ]);

        if (!$validation->passes) {
            return JsonResponse::errors($validation->errors);
        }

        if (!Subscription::create(request()->all())) {
            return JsonResponse::errors(['Unable to subscribe, try again']);
        }

        return JsonResponse::message("You're subscribed. We'll notify you when we drop a line.");
    }
}
