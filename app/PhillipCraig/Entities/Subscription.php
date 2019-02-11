<?php

namespace App\PhillipCraig\Entities;

use Illuminate\Database\Eloquent\Model;

class Subscription extends Model
{
    protected $fillable = [
        'email',
        'subscribed',
    ];

    public $casts = [
        'subscribed' => 'boolean',
    ];
}
