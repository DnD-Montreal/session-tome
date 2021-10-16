<?php

namespace App\Observers;

use App\Models\Entry;

class EntryObserver
{
    /**
     * Handle the Entry "created" event.
     *
     * @param  \App\Models\Entry  $entry
     * @return void
     */
    public function created(Entry $entry)
    {
        $character = $entry->character;
        $character->level += $entry->levels;

        $character->save();
    }

    /**
     * Handle the Entry "updated" event.
     *
     * @param  \App\Models\Entry  $entry
     * @return void
     */
    public function updated(Entry $entry)
    {
        $character = $entry->character;
        if ($entry->isDirty('levels')) {
            $levelDelta = $entry->levels - $entry->getOriginal('levels');
            $character->level += $levelDelta;
            $character->save();
        }
    }

    /**
     * Handle the Entry "deleted" event.
     *
     * @param  \App\Models\Entry  $entry
     * @return void
     */
    public function deleting(Entry $entry)
    {
        $character = $entry->character;
        if ($entry->levels) {
            $character->level -= $entry->levels;
            $character->save();
        }
    }
}
