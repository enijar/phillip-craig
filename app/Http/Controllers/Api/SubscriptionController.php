<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Notifications\NewSubscription;
use App\PhillipCraig\Entities\Subscription;
use App\PhillipCraig\Http\JsonResponse;
use Illuminate\Support\Facades\Notification;

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

        $subscription = Subscription::create(request()->all());

        if (!$subscription) {
            return JsonResponse::errors(['Unable to subscribe, try again']);
        }

        if (env('APP_ENV') === 'production') {
            Notification::route('slack', env('SLACK_WEBHOOK_URL'))
                ->notify(new NewSubscription($subscription));
        }

        return JsonResponse::message("You're subscribed");
    }
}
