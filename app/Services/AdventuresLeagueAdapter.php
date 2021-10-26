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
        $character = new Character($characterData);
        $character->save();

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
        for ($i = 4; $i < count($data); $i++) {
            //Check if row is a magic item entry
            $isItemEntry = ($data[$i][0] == "MAGIC ITEM");

            if (!$isItemEntry) {
                $entryData = [
                    'user_id' => Auth::id(),
                    'character_id' => $characterId,
                    'date_played' => (array_key_exists(3, $data[$i])) ? $data[$i][3] : now(),
                    'type' => Entry::TYPE_GAME,
                    'gp' => (array_key_exists(7, $data[$i])) ? (float)$data[$i][7] : 0,
                ];
                array_push($entries, new Entry($entryData));
            }
            // Item importing to be refactored
            /*else {
                //create the item and attach it to the last entry
                $latestEntry = end($entries);
                if (is_null($latestEntry)) {
                    continue;
                }
                $itemData = [
                    'name' => $data[$i][1],
                    'rarity' => $data[$i][2],
                ];
                $latestEntry->items()->save(new Item($itemData));
            }*/
        }
        return $entries;
    }
}