<?php

namespace App\Http\Requests;

use App\PhillipCraig\Http\JsonResponse;
use App\PhillipCraig\Services\InputSanitizer;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class SubscriptionPost extends FormRequest
{
    public function rules(): array
    {
        return [
            'email' => 'required|email|spam_email|unique:subscriptions,email|max:255',
            'captcha' => 'required|recaptcha',
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Please enter your email',
            'email.email' => 'Please enter a valid email',
            'email.unique' => "You've already subscribed with that email",
            'email.spam_email' => 'Sorry, but your email provider has been flagged as spam, try another email',
            'max.email' => 'Email too long, please make it 255 or less characters',
            'captcha.required' => "Please verify you're not a robot",
            'captcha.recaptcha' => "Please verify you're not a robot",
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(JsonResponse::errors($validator->getMessageBag()->all(), 422));
    }

    protected function getValidatorInstance(): Validator
    {
        $input = $this->all();
        $input['email'] = InputSanitizer::email(isset($input['email']) ? $input['email'] : '');
        $this->getInputSource()->replace($input);
        return parent::getValidatorInstance();
    }
}
