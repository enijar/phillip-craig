<?php

$default = [
    'subject' => 'Phillip Craig',
    'from' => [
        'email' => 'bot@phillipcraig.com',
        'name' => 'Phillip Craig',
    ],
];

return [
    'email' => $default['from']['email'],
    'subscribe' => array_replace_recursive($default, [
        'subject' => 'Subscribed to Phillip Craig',
    ]),
    'unsubscribe' => array_replace_recursive($default, [
        'subject' => 'Unsubscribed to Phillip Craig',
    ]),
];
