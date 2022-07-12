<?php

namespace App\Services;

use App\Exceptions\ImportException;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

/**
 * Wraps the AdventuresLeagueLog exported csv file handling.
 *
 * Class AdventuresLeagueAdapter
 */
class AdventuresLeagueAdapter
{
    /**
     * Extract Character data from given file and Hydrate as Character Model
     *
     * @param $url
     * @return Character|null
     */
    public function getCharacter($filePath): ?Character
    {
        // Fetch character data from the file path
        $data = file_get_contents($filePath);

        // Extract Data Lines
        $data = preg_split("/\r\n|\n|\r/", $data);

        // Check if export format is what we expect
        if ($data[0] != 'name,race,class_and_levels,faction,background,lifestyle,portrait_url,publicly_visible') {
            throw new ImportException("Adventure's League Log File Error: Export File Format Changed", 400);
        }

        // Separate lines into cells
        for ($i = 0; $i < count($data); $i++) {
            $data[$i] = explode(',', $data[$i]);
        }

        // Get total Character Level from String (ex: "Fighter 2, Warlock 6")
        $characterLevel = 1;
        preg_match_all("/\d{1,2}/", $data[1][2], $classLevels);
        if (! is_null($classLevels[0])) {
            $levelSum = array_sum($classLevels[0]);
            $characterLevel = $levelSum > 0 ? $levelSum : 1;
        }
        $characterLine = collect($data[1]);
        $characterData = [
            'user_id' => Auth::id(),
            'name' => (string) $characterLine->get(0),
            'race' => (string) $characterLine->get(1),
            'class' => (string) $characterLine->get(2),
            'level' => $characterLevel,
            'faction' => substr($data[1][3], 0, 1) == '#' ? '' : $characterLine->get(3), //Sometimes export has faction as a strange code such as #<...>
            'background' => (string) $characterLine->get(4),
        ];

        // Hydrate Model
        $character = Character::create($characterData);

        // Get the entries from the file
        $entries = $this->getEntries($data, $character->id);

        $character->entries()->saveMany($entries);

        return $character;
    }

    /**
     * Get the entries from the file passed to the adaptor getCharacter function
     *
     * @param  array  $data The data extracted from the file
     * @param  int  $characterId The id of the character being created
     * @return array       Returns an array of instances of the Entry class
     */
    private function getEntries($data, $characterId)
    {
        $entries = [];

        // entries only begin on line 5 (index 4) of the exported csv
        for ($i = 4; $i < count($data); $i++) {
            $isItemEntry = ($data[$i][0] == 'MAGIC ITEM') || ($data[$i][0] == 'TRADED MAGIC ITEM');
            $isCharacterLogEntry = ($data[$i][0] == 'CharacterLogEntry');
            $isCampaignLogEntry = ($data[$i][0] == 'CampaignLogEntry');
            $isDmLogEntry = ($data[$i][0] == 'DmLogEntry');
            $isTradeLogEntry = ($data[$i][0] == 'TradeLogEntry');
            $isPurchaseLogEntry = ($data[$i][0] == 'PurchaseLogEntry');

            $isEntryLine = ($isCharacterLogEntry || $isDmLogEntry || $isCampaignLogEntry || $isTradeLogEntry || $isPurchaseLogEntry);

            if ($isEntryLine) {
                $type = '';
                if ($isDmLogEntry) {
                    $type = Entry::TYPE_DM;
                } elseif ($isCampaignLogEntry || $isCharacterLogEntry) {
                    $type = Entry::TYPE_GAME;
                } else {
                    $type = Entry::TYPE_DOWNTIME;
                }
                $entryData = $this->getEntryData($characterId, $data[$i], $type);
                $entry = Entry::create($entryData);
                $entry->save();
                array_push($entries, $entry);
            } elseif ($isItemEntry) {
                if (count($entries) == 0) {
                    $entryData = $this->getEntryData($characterId);
                    $e = Entry::create($entryData);
                    $e->save();
                    array_push($entries, $e);
                }

                $rarity = ((array_key_exists(2, $data[$i])) ? (string) $data[$i][2] : 'common');
                $lastEntry = $entries[array_key_last($entries)];

                $itemLine = collect($data[$i]);
                $itemData = [
                    'entry_id' => $lastEntry->id,
                    'character_id' => $characterId,
                    'name' => (string) $itemLine->get(1),
                    'rarity' => in_array($rarity, Item::RARITY) ? $rarity : 'uncommon', //need enum
                    'description' => (string) $itemLine->get(6),
                    'author_id' => Auth::id(),
                    'tier' => 0,
                ];
                Item::create($itemData);
            }
        }

        return $entries;
    }

    private function getEntryData($characterId, $data = null, $type = null)
    {
        $entryData = [
            'user_id' => Auth::id(),
            'adventure_id' => null,
            'campaign_id' => null,
            'character_id' => $characterId,
            'event_id' => null,
            'dungeon_master_id' => null,
            'levels' => 0,
        ];

        if (is_null($data)) {
            $defaultEntryData = [
                'date_played' => now(),
                'gp' => 0,
                'downtime' => 0,
                'type' => Entry::TYPE_GAME,
            ];

            return array_merge($entryData, $defaultEntryData);
        } else {
            $data = collect($data);
            $populatedEntryData = [
                'dungeon_master' => (string) $data->get(12),
                'location' => (string) $data->get(11),
                'date_played' => Carbon::parse($data->get(3)),
                'gp' => (float) $data->get(7, 0),
                'downtime' => (float) $data->get(8, 0),
                'levels' => ((float) $data->get(8, 0) > 0) ? 1 : 0,
                'type' => $type,
            ];

            return array_merge($entryData, $populatedEntryData);
        }
    }
}
