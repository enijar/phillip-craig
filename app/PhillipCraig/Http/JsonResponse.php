<?php

namespace App\PhillipCraig\Http;

use Illuminate\Support\Facades\Validator;

class JsonResponse
{
    /**
     * @param array $rules
     * @param array $errorMessages
     * @param array $data
     * @return \stdClass
     */
    public static function validate(array $rules = [], array $errorMessages = [], array $data = null): \stdClass
    {
        $data = is_null($data) ? request()->all() : $data;
        $validator = Validator::make($data, $rules, $errorMessages);

        if ($validator->fails()) {
            return (object)['passes' => false, 'errors' => $validator->getMessageBag()->all()];
        }

        return (object)['passes' => true];
    }

    /**
     * @param array $errors
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public static function errors(array $errors = [], $code = 400)
    {
        return response()->json(compact('errors'), $code);
    }

    public static function data(array $data = [], $code = 200)
    {
        return response()->json($data, $code);
    }

    /**
     * @param string $message
     * @param int $code
     * @return \Illuminate\Http\JsonResponse
     */
    public static function message(string $message, $code = 200)
    {
        return response()->json(compact('message'), $code);
    }
}
