<?php

namespace App\Observers;

use App\Models\Campaign;
use App\Models\Character;
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
        $isDMEntry = $entry->type == Entry::TYPE_DM;

        if (!$isDMEntry || !is_null($entry->character)) {
            $character = $entry->character;
            $character->level += $entry->levels;
            $character->save();
        }

        //Handle Campaign Entry Creation
        $inCampaign = !is_null($entry->campaign);
        if ($inCampaign && $isDMEntry) {
            $campaign = $entry->campaign;
            $this->generateCharacterEntriesForCampaign(-1, $campaign, $entry->attributesToArray());
        } elseif ($inCampaign) {
            $campaign = $entry->campaign;
            $char = $entry->character;
            $this->generateCharacterEntriesForCampaign($char->id, $campaign, $entry->attributesToArray());
            //TODO: Generate DM Entry
        }
    }

    /**
     * Handle the Entry "updated" event.
     *
     * @param  \App\Models\Entry  $entry
     * @return void
     */
    public function updated(Entry $entry)
    {
        if ($entry->type != Entry::TYPE_DM || !is_null($entry->character)) {
            $character = $entry->character;
            $dirtyLevel = $entry->isDirty('levels');
            $dirtyCharacter = $entry->isDirty('character_id');

            // level changed and new character -> add current entry level to newly added character
            if ($dirtyLevel && $dirtyCharacter) {
                $character->level += $entry->levels;
                $character->save();
            }

            // level changed with old character -> calculate change in entry level and apply to character
            elseif ($dirtyLevel) {
                $levelDelta = $entry->levels - $entry->getOriginal('levels');
                $character->level += $levelDelta;
                $character->save();
            }

            // entry level unchanged but character newly attached -> add level to character
            elseif (!is_null($character) && $dirtyCharacter) {
                $character->level = (is_null($character->level))
                    ? $entry->levels
                    : $character->level + $entry->levels;
                $character->save();
            }
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
        if ($entry->type != Entry::TYPE_DM || !is_null($entry->character)) {
            $character = $entry->character;
            if ($entry->levels) {
                $character->level -= $entry->levels;
                $character->save();
            }
        }
    }

    /**
     * Creates entries on all characters except one designated to be ignored.
     * @param int $excludedCharacterId Character to be excluded
     * @param Campaign $campaign Campaign for which the entries are being created
     * @param $entryData Array of data from the triggering entry
     */
    private function generateCharacterEntriesForCampaign(int $excludedCharacterId, Campaign $campaign, $entryData)
    {
        $characters = $campaign->characters;

        foreach ($characters as $character) {
            if ($character->id != $excludedCharacterId) {
                $newEntry = Entry::create($entryData);
                $newEntry->character()->associate($character);
                $newEntry->user()->associate($character->user);
                $newEntry->campaign()->associate($campaign);
                $newEntry->saveQuietly();
            }
        }
    }
}
