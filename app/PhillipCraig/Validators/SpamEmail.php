<?php

namespace App\PhillipCraig\Validators;

class SpamEmail
{
    public function validate($attribute, $value, $parameters, $validator)
    {
        $blacklistedEmailDomains = file_get_contents(storage_path('data/blacklist.txt'));
        $blacklistedEmailDomains = explode("\n", $blacklistedEmailDomains);
        $emailDomainParts = explode('@', $value);
        $emailDomain = isset($emailDomainParts[1]) ? $emailDomainParts[1] : null;

        if (is_null($emailDomain)) {
            return false;
        }

        return !in_array($emailDomain, $blacklistedEmailDomains);
    }
}
