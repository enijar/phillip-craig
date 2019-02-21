<?php

namespace App\Listeners\NewSubscription;

use App\Events\NewSubscription;
use App\Mail\SubscriptionConfirmationMail;
use Illuminate\Support\Facades\Mail;

class SendConfirmationEmailToNewSubscription
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

        Mail::send(new SubscriptionConfirmationMail($newSubscription->subscription));
    }
}
