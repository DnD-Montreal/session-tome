<?php

namespace App\Policies;

use App\Models\Trade;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class TradePolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function update(User $user, Trade $trade)
    {
        return $trade->character->user->id == $user->id || $user->isSiteAdmin();
    }
} //this curly brace keeps moving.... keep an eye on it.
