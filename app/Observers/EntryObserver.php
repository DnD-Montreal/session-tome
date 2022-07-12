<?php

namespace App\Observers;

use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use Illuminate\Support\Collection;

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

        if (! $isDMEntry || ! is_null($entry->character)) {
            $character = $entry->character;
            $character->level += $character->level < 20 ? $entry->levels : 0;
            $character->save();
        }

        //Handle Campaign Entry Creation
        $inCampaign = ! is_null($entry->campaign);
        if ($inCampaign && $isDMEntry) {
            $campaign = $entry->campaign;
            $this->generateCharacterEntriesForCampaign(-1, $campaign, collect($entry->attributesToArray()));
        } elseif ($inCampaign) {
            $campaign = $entry->campaign;
            $char = $entry->character;
            $this->generateCharacterEntriesForCampaign($char->id, $campaign, collect($entry->attributesToArray()));
            $this->generateGMEntryForCampaign($campaign, collect($entry->attributesToArray()));
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
        if ($entry->type != Entry::TYPE_DM || ! is_null($entry->character)) {
            $character = $entry->character;
            $dirtyLevel = $entry->isDirty('levels');
            $dirtyCharacter = $entry->isDirty('character_id');

            // level changed and new character: add current entry level to newly added character
            if ($dirtyLevel && $dirtyCharacter) {
                $character->level += $entry->levels;
                $character->save();
            } elseif ($dirtyLevel) {
                // User changed the amount of levels granted by entry: calculate change in entry level and apply to character
                $levelDelta = $entry->levels - $entry->getOriginal('levels');
                $character->level += $levelDelta;
                $character->save();
            } elseif (! is_null($character) && $dirtyCharacter) {
                // entry level unchanged but character newly attached -> add level to character
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
        if ($entry->type != Entry::TYPE_DM || ! is_null($entry->character)) {
            $character = $entry->character;
            if ($entry->levels) {
                $character->level -= $entry->levels;
                $character->save();
            }
        }

        if ($entry->exists('rating')) {
            $entry->rating()->delete();
        }
    }

    /**
     * Creates entries on all characters except one designated to be ignored.
     *
     * @param  int  $excludedCharacterId Character to be excluded
     * @param  Campaign  $campaign Campaign for which the entries are being created
     * @param $entryData Collection of data from the triggering entry
     */
    private function generateCharacterEntriesForCampaign(int $excludedCharacterId, Campaign $campaign, Collection $entryData)
    {
        $characters = $campaign->characters;
        $entryData->forget(['campaign_id', 'session', 'reward', 'id']);

        foreach ($characters as $character) {
            if ($character->id != $excludedCharacterId) {
                $entryData['character_id'] = $character->id; // assign to the correct character
                $entryData['user_id'] = $character->user->id; // author this entry by the correct person
                $entryData['type'] = $entryData['type'] == Entry::TYPE_DM
                    ? Entry::TYPE_GAME
                    : $entryData['type'];
                $entryData['dungeon_master'] = is_array($entryData['dungeon_master']) ? $entryData['dungeon_master']['name'] : $entryData['dungeon_master'];

                //Create the Entry and allow the observer to fire to modify the character
                $newEntry = Entry::create($entryData->toArray());

                //Add remaining missing associations to the entry and save quietly to avoid infinite looping
                $newEntry->campaign()->associate($campaign);
                $newEntry->character()->associate($character);
                $newEntry->user()->associate($character->user);
                $newEntry->saveQuietly();
            }
        }
    }

    /**
     * Create the entry for the GM of a campaign
     *
     * @param  Campaign  $campaign
     * @param  Collection  $entryData
     */
    private function generateGMEntryForCampaign(Campaign $campaign, Collection $entryData)
    {
        //get the GM (currently handles multiple GMs by just creating an entry for each of them)
        $GMs = $campaign->users()->wherePivot('is_dm', 1)->get();

        //prep the data
        $entryData->forget(['campaign_id', 'character_id', 'session', 'reward', 'id']);
        $entryData['type'] = Entry::TYPE_DM;
        // Pull out the appropriate dungeon master name field
        $entryData['dungeon_master'] = is_array($entryData['dungeon_master']) ? $entryData['dungeon_master']['name'] : $entryData['dungeon_master'];

        foreach ($GMs as $GM) {
            $entryData['user_id'] = $GM->id;

            //Create the Entry and allow the observer to fire to modify the character
            $newEntry = Entry::create($entryData->toArray());

            //Add remaining missing associations to the entry and save quietly to avoid infinite looping
            $newEntry->campaign()->associate($campaign);
            $newEntry->user()->associate($GM);
            $newEntry->saveQuietly();
        }
    }
}
