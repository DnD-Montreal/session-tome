<?php

namespace App\Actions;

use App\Models\Entry;
use App\Models\Trade;
use App\Models\Item;
use App\Models\Character;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class FulfillTrade
{
    use AsAction;

    /**
     * Expect an array of item details, create each item and attach them to the appropriate relation objects
     *
     * @param Entry $entry
     * @param array $items
     */
    public function handle(Trade $trade, Item $offeredItem)
    {
        $tradeCharacter = $trade->character;
        $tradeItem = $trade->item;
        $offerCharacter = $offeredItem->character;

        $currentUser = Auth::user();
        $offerUser = $offerCharacter->user;

        // check if somehow a user other than the trade creator has managed to get to this point and it attempting to fulfill this trade.
        //TODO: also check if trade has been closed (already fulfilled) (soft delete trades on fulfillment?)
        if (!$currentUser->characters->contains($tradeCharacter)) {
            //TODO: return some error here
        }

        $tradeItem->character()->disassociate()->save();
        $offeredItem->character()->dissociate()->save();

        $offeredItem->character()->associate($tradeCharacter->id)->save();
        $tradeItem->character()->associate($offerCharacter->id)->save();

        $entryData = [
            'date_played' => now(),
            'type' => Entry::TYPE_DOWNTIME,
            'levels' => 0,
            'notes' => "Trade between ".$tradeCharacter->name." and ".$offerCharacter->name
        ];

        $tradeCharacterEntry = Entry::create(array_merge($entryData, [
            'user_id' => $currentUser->id,
            'character_id' => $tradeCharacter->id]));
        $offeredItem->entry()->associate($tradeCharacterEntry)->save();

        $offerCharacterEntry = Entry::create(array_merge($entryData, [
            'user_id' => $offerUser->id,
            'character_id' => $offerCharacter->id]));
        $tradeItem->entry()->associate($offerCharacterEntry)->save();
    }
}
