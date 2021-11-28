<?php

namespace App\Services;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\UnauthorizedException;

/**
 * Wraps the AdventuresLeagueLog exported csv file handling.
 *
 * Class AdventuresLeagueAdapter
 * @package App\Services
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
        if ($data[0] != "name,race,class_and_levels,faction,background,lifestyle,portrait_url,publicly_visible") {
            return null;
        }

        // Separate lines into cells
        for ($i = 0; $i < count($data); $i++) {
            $data[$i] = explode(',', $data[$i]);
        }

        // Get total Character Level from String (ex: "Fighter 2, Warlock 6")
        $characterLevel = 1;
        preg_match_all("/\d{1,2}/", $data[1][2], $classLevels);
        if (!is_null($classLevels[0])) {
            $levelSum = array_sum($classLevels[0]);
            $characterLevel = $levelSum > 0 ? $levelSum : 1;
        }

        $characterData = [
            'user_id' => Auth::id(),
            'name' => (array_key_exists(0, $data[1])) ? $data[1][0] : "",
            'race' => (array_key_exists(1, $data[1])) ? $data[1][1] : "",
            'class' => (array_key_exists(2, $data[1])) ? $data[1][2] : "",
            'level' => $characterLevel,
            'faction' => substr($data[1][3], 0, 1) == "#" ? "" : $data[1][3], //Sometimes export has faction as a strange code such as #<...>
            'background' => (array_key_exists(4, $data[1])) ? $data[1][4] : "",
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
     * @param  array $data The data extracted from the file
     * @param  int $characterId The id of the character being created
     * @return array       Returns an array of instances of the Entry class
     */
    private function getEntries($data, $characterId)
    {
        $entries = [];

        // entries only begin on line 5 (index 4) of the exported csv
        for ($i = 4; $i < count($data); $i++) {
            $isItemEntry = ($data[$i][0] == "MAGIC ITEM") || ($data[$i][0] == "TRADED MAGIC ITEM");
            $isCharacterLogEntry = ($data[$i][0] == "CharacterLogEntry");
            $isCampaignLogEntry = ($data[$i][0] == "CampaignLogEntry");
            $isDmLogEntry = ($data[$i][0] == "DmLogEntry");
            $isTradeLogEntry = ($data[$i][0] == "TradeLogEntry");
            $isPurchaseLogEntry = ($data[$i][0] == "PurchaseLogEntry");

            $isEntryLine = ($isCharacterLogEntry || $isDmLogEntry || $isCampaignLogEntry || $isTradeLogEntry || $isPurchaseLogEntry);

            if ($isEntryLine) {
                $type = "";
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
                    $entryData = $this->getEntryData($characterId, null, null);
                    $e = Entry::create($entryData);
                    $e->save();
                    array_push($entries, $e);
                }

                $rarity = ((array_key_exists(2, $data[$i])) ? (string) $data[$i][2] : "common");
                $lastEntry = $entries[array_key_last($entries)];

                $itemData = [
                    'entry_id' => $lastEntry->id,
                    'character_id' => $characterId,
                    'name' => (array_key_exists(1, $data[$i])) ? $data[$i][1] : "",
                    'rarity' => in_array($rarity, Item::RARITY) ? $rarity : "uncommon", //need enum
                    'description' => (array_key_exists(6, $data[$i])) ? $data[$i][6] : "",
                    'author_id' => Auth::id(),
                    'tier' => 0,
                ];
                Item::create($itemData);
            }
        }
        return $entries;
    }

    private function getEntryData($characterId, $data, $type)
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
            $populatedEntryData = [
                'dungeon_master' => (array_key_exists(12, $data)) ? (float)$data[12] : "",
                'location' => (array_key_exists(11, $data)) ? (float)$data[11] : "",
                'date_played' => ($data[3] == "") ? now() : $data[3],
                'gp' => (array_key_exists(7, $data)) ? (float)$data[7] : 0,
                'downtime' => (array_key_exists(8, $data)) ? (float)$data[8] : 0,
                'type' => $type,
            ];
            return array_merge($entryData, $populatedEntryData);
        }
    }
}
