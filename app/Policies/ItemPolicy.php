<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Item;
use Illuminate\Auth\Access\HandlesAuthorization;

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

    public function store(User $user, Item $item)
    {
        dd($item->user()->id);
        return $item->user()->id == $user->id || $user->isSiteAdmin();
    }
}
