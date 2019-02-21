<?php

namespace App\PhillipCraig\Services;

class InputSanitizer
{
    /**
     * Formats emails that support the "+" postfix,
     * e.g. example+1@gmail.com becomes example@gmail.com
     *
     * @param string $email
     * @return string
     */
    public static function email(string $email = '')
    {
        if (!stristr($email, '@')) {
            return $email;
        }

        $parts = explode('@', request()->get('email', ''));

        // check if there is a "+" and return the string before
        $beforePlus = strstr($parts[0], '+', true);
        $beforeAt = $beforePlus ? $beforePlus : $parts[0];

        return "{$beforeAt}@{$parts[1]}";
    }
}
