<?php

namespace App\Policies;

use App\Models\Entry;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class EntryPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can update the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function update(User $user, Entry $entry)
    {
        return $user->id == $entry->user_id || $user->isSiteAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Entry  $entry
     * @return \Illuminate\Auth\Access\Response|bool
     */
    public function delete(User $user, Entry $entry)
    {
        return $user->id == $entry->user_id || $user->isSiteAdmin();
    }
}
