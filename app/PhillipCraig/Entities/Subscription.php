<?php

namespace App\PhillipCraig\Entities;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;

class Subscription extends Model
{
    use Notifiable;

    protected $fillable = [
        'email',
        'subscribed',
    ];

    public $casts = [
        'subscribed' => 'boolean',
    ];
}
