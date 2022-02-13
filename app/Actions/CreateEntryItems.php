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
        $items = collect($items)->sortBy('id');
        $existing = Item::whereIn('id', $items->pluck('id')->filter())
            ->where('character_id', $entry->character_id)
            ->get()
            ->getDictionary();

        foreach ($items as $item) {
            // if the item exists, update it
            if (isset($item['id'])) {
                $out[] = $existing[$item['id']]->fill($item);
            } else {
                // otherwise, make a new one
                $out[] = new Item(
                    array_merge([
                        'author_id' => Auth::id(),
                        'character_id' => $entry->character_id
                    ], $item)
                );
            }
        }

        return $entry->items()->saveMany($out);
    }
}
