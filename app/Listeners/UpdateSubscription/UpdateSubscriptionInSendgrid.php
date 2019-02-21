<?php

namespace App\Listeners\UpdateSubscription;

use App\Events\UpdateSubscription;
use App\PhillipCraig\Services\SendGrid;

class UpdateSubscriptionInSendgrid
{
    /**
     * Handle the event.
     *
     * @param UpdateSubscription $updateSubscription
     * @return void
     */
    public function handle(UpdateSubscription $updateSubscription)
    {
        if (env('APP_ENV') !== 'production') {
            return;
        }

        $sendGrid = new SendGrid();
        $listId = config('phillip_craig.mail.sendgrid_lists.notifications');
        $email = $updateSubscription->subscription->getAttribute('email');

        if ($updateSubscription->subscription->getAttribute('subscribed')) {
            $sendGrid->addRecipientToList($listId, $email);
        } else {
            $sendGrid->removeRecipientToList($listId, $email);
        }
    }
}
