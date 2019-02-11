<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\PhillipCraig\Http\JsonResponse;

class SubscriptionController extends Controller
{
    public function subscribe()
    {
        return JsonResponse::data(['success' => true]);
    }
}
