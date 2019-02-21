<?php

namespace App\Events;

use App\PhillipCraig\Entities\Subscription;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;

class UpdateSubscription
{
    use Dispatchable, SerializesModels;

    public $subscription;

    /**
     * Create a new event instance.
     *
     * @param Subscription $subscription
     */
    public function __construct(Subscription $subscription)
    {
        $this->subscription = $subscription;
    }
}
