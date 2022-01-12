<?php

namespace App\Observers;

use App\Models\Character;

class CharacterObserver
{
    /**
     * Handle the Character "deleting" event.
     * Detach all entries from a character marked for deletion.
     * This allows all rating associated with these entries to remain in our system.
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
