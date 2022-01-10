<?php

namespace App\Actions;

use App\Models\Entry;
use App\Models\Item;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateEntryItems
{
    use AsAction;

    /**
     * Expect an array of item details, create each item and attach them to the appropriate relation objects
     *
     * @param Entry $entry
     * @param array $items
     */
    public function handle(Entry $entry, array $items)
    {
        $out = collect();

        $entry->items()->delete();

        foreach ($items as $item) {
            $out[] = new Item(
                array_merge([
                    'author_id' => Auth::id(),
                    'character_id' => $entry->character_id
                ], $item)
            );
        }

        return $entry->items()->saveMany($out);
    }
}
