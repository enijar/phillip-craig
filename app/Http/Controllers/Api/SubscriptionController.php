<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Mail\SubscriptionConfirmationMail;
use App\Notifications\NewSubscription;
use App\PhillipCraig\Entities\Subscription;
use App\PhillipCraig\Http\JsonResponse;
use App\PhillipCraig\Services\SendGrid;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Notification;

class SubscriptionController extends Controller
{
    public function subscribe()
    {
        $validation = JsonResponse::validate([
            'email' => 'required|email|unique:subscriptions,email,max:255',
            'captcha' => 'required|recaptcha',
        ], [
            'email.required' => 'Please enter your email',
            'email.email' => 'Please enter a valid email',
            'email.unique' => "You've already subscribed with that email",
            'max.email' => 'Email too long, please make it 255 or less characters',
            'captcha.required' => "Please verify you're not a robot",
            'captcha.recaptcha' => "Please verify you're not a robot",
        ]);

        if (!$validation->passes) {
            return JsonResponse::errors($validation->errors);
        }

        $email = request()->get('email');
        $code = str_random(60);
        $subscription = Subscription::create(compact('email', 'code'));

        if (!$subscription) {
            return JsonResponse::errors(['Unable to subscribe, try again']);
        }

        // @todo Move these external API calls to a queue to process. It's bad practice to
        // make the user wait for these requests to finish
        if (env('APP_ENV') === 'production') {
            try {
                $sg = new SendGrid();
                $sg->addContact($email);
                $this->contactSubscription($email, true);
                Notification::route('slack', env('SLACK_WEBHOOK_URL'))
                    ->notify(new NewSubscription($subscription));
            } catch (\Exception $exception) {
                Log::error($exception->getMessage());
            }
        }

        // @todo Send verification of subscription to user's email
        Mail::send(new SubscriptionConfirmationMail($subscription));

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

        $this->contactSubscription($subscription->email, $subscribed);

        if (env('APP_ENV') === 'production') {
            $this->contactSubscription($subscription->email, false);
        }

        $message = "You're now " . ($subscribed === 1 ? 'subscribed' : 'unsubscribed');
        $actionMessage = $subscribed === 1 ? 'unsubscribe' : 'subscribe';
        $action = route('subscription', array_merge($data, ['subscribed' => $subscribed === 1 ? 0 : 1]));

        return "<p>{$message}</p><p>Click <a href='{$action}'>here</a> to {$actionMessage}</p>";
    }

    private function contactSubscription(string $email, $subscribed = true)
    {
        // @todo Move this to queue

        $sg = new SendGrid();
        $listId = config('phillip_craig.mail.sendgrid_lists.notifications');

        if ($subscribed) {
            $sg->addRecipientToList($listId, $email);
        } else {
            $sg->removeRecipientToList($listId, $email);
        }
    }
}
