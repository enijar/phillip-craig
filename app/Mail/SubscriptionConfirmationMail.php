<?php

namespace App\Mail;

use App\PhillipCraig\Entities\Subscription;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SubscriptionConfirmationMail extends Mailable
{
    use Queueable, SerializesModels;

    public $subscription;

    /**
     * Create a new message instance.
     * @param Subscription $subscription
     */
    public function __construct(Subscription $subscription)
    {
        $this->subscription = $subscription;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $mail = config('phillip_craig.mail.subscribe');

        return $this
            ->subject($mail['subject'])
            ->to($this->subscription->getAttribute('email'))
            ->from($mail['from']['email'], $mail['from']['name'])
            ->view('mail.subscription-confirmation', [
                'id' => $this->subscription->getAttribute('id'),
                'code' => $this->subscription->getAttribute('code'),
            ]);
    }
}
