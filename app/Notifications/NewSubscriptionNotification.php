<?php

namespace App\Notifications;

use App\PhillipCraig\Entities\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Messages\SlackMessage;
use Illuminate\Notifications\Notification;

class NewSubscriptionNotification extends Notification
{
    use Queueable;

    public $subscription;

    /**
     * Create a new notification instance.
     * @param Subscription $subscription
     */
    public function __construct(Subscription $subscription)
    {
        $this->subscription = $subscription;
    }

    /**
     * Get the notification's delivery channels.
     * @return array
     */
    public function via()
    {
        return ['slack'];
    }

    /**
     * Get the Slack representation of the notification.
     * @return SlackMessage
     */
    public function toSlack()
    {
        return (new SlackMessage)
            ->from('Bot', ':robot_face:')
            ->to('#subscriptions')
            ->content("New subscription from {$this->subscription->getAttribute('email')}");
    }
}
