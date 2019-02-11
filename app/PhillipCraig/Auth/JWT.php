<?php

namespace App\DeBeers\Auth;

use App\DeBeers\Entities\User;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;

class JWT
{
    /**
     * Attempt to get a token from the given user
     *
     * @param User $user
     * @return null|string
     */
    public static function token(User $user): ?string
    {
        try {
            return JWTAuth::fromUser($user);
        } catch (\Exception $exception) {
            Log::error($exception);
            return null;
        }
    }

    /**
     * Attempt to get a token from the given email and password
     *
     * @param string $email
     * @param string $password
     * @return null|string
     */
    public static function attempt(string $email, string $password): ?string
    {
        try {
            return JWTAuth::attempt(compact('email', 'password'));
        } catch (\Exception $exception) {
            Log::error($exception);
            return null;
        }
    }

    /**
     * Attempt to get the user from the token in the bearer header
     *
     * @return false|null|\Tymon\JWTAuth\Contracts\JWTSubject
     */
    public static function user(): ?User
    {
        try {
            $authenticated = JWTAuth::parseToken()->authenticate();
            return $authenticated ?: null;
        } catch (\Exception $exception) {
            Log::error($exception);
            return null;
        }
    }
}
