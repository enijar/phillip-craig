<?php

namespace App\Listeners\NewSubscription;

use App\Events\NewSubscription;
use App\PhillipCraig\Services\SendGrid;

class AddSubscriptionToSendgrid
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

        $email = $newSubscription->subscription->getAttribute('email');
        $sendGrid = new SendGrid();
        $listId = config('phillip_craig.mail.sendgrid_lists.notifications');

        $sendGrid->addContact($email);
        $sendGrid->addRecipientToList($listId, $email);
    }
}
