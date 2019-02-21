<?php

namespace App\Http\Controllers\Api;

use App\Events\NewSubscription;
use App\Events\UpdateSubscription;
use App\Http\Controllers\Controller;
use App\Http\Requests\SubscriptionPost;
use App\PhillipCraig\Entities\Subscription;
use App\PhillipCraig\Http\JsonResponse;

class SubscriptionController extends Controller
{
    public function subscribe(SubscriptionPost $request)
    {
        $email = $request->get('email');
        $code = str_random(60);
        $subscription = Subscription::create(compact('email', 'code'));

        if (!$subscription) {
            return JsonResponse::errors(['Unable to subscribe, try again']);
        }

        event(new NewSubscription($subscription));

        return JsonResponse::message("You're subscribed");
    }

    public function update(string $id, string $code, int $subscribed)
    {
        $data = compact('id', 'code');
        $subscription = Subscription::where($data)->first();

        if (is_null($subscription)) {
            return 'Invalid link';
        }

        $subscription->update(compact('subscribed'));

        event(new UpdateSubscription($subscription));

        $message = "You're now " . ($subscribed === 1 ? 'subscribed' : 'unsubscribed');
        $actionMessage = $subscribed === 1 ? 'unsubscribe' : 'subscribe';
        $action = route('subscription', array_merge($data, ['subscribed' => $subscribed === 1 ? 0 : 1]));

        return "<p>{$message}</p><p>Click <a href='{$action}'>here</a> to {$actionMessage}</p>";
    }
}
