<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Trade;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Http\Request;

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
}
    public function update(User $user, Trade $trade)
    {
        return $trade->character->user->id == $user->id || $user->isSiteAdmin();
    }
