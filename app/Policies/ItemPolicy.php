<?php

namespace App\Policies;

use App\Models\Character;
use App\Models\User;
use App\Models\Item;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Http\Request;

class ItemPolicy
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

    public function update(User $user, Item $item)
    {
        return $item->user()->id == $user->id || $user->isSiteAdmin();
    }

    public function create(User $user)
    {
        $request = request();
        return $request->user()->id == Character::findOrFail($request->character_id)->user->id || $user->isSiteAdmin();
    }
}
