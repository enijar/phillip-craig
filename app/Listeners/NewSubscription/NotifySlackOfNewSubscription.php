<?php

namespace App\Listeners\NewSubscription;

use App\Events\NewSubscription;
use App\Notifications\NewSubscriptionNotification;
use Illuminate\Support\Facades\Notification;

class NotifySlackOfNewSubscription
{
    /**
     * Handle the event.
     *
     * @param NewSubscription $newSubscription
     * @return void
     */
    public function handle(NewSubscription $newSubscription)
    {
        if (env('APP_ENV') !== 'production') {
            return;
        }

        $notification = new NewSubscriptionNotification($newSubscription->subscription);
        Notification::route('slack', env('SLACK_WEBHOOK_URL'))->notify($notification);
    }
}
