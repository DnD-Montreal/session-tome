<?php

namespace App\Policies;

use App\Models\Character;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class CharacterPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Character  $character
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function view(User $user, Character $character)
    {
        return $character->status == "public" || $character->user_id == $user->id;
    }


    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Character  $character
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Character $character)
    {
        return $user->id == $character->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Character  $character
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Character $character)
    {
        return $user->id == $character->user_id;
    }
}
