<?php

namespace App\Observers;

use App\Models\Character;

class CharacterObserver
{
    /**
     * Handle the Character "deleting" event.
     *
     * @param  \App\Models\Character  $character
     * @return void
     */
    public function deleting(Character $character)
    {
        $character->entries->each(function ($entry) {
            $entry->character_id = null;
            $entry->save();
        });
    }
}
