<?php

namespace App\Actions;

use App\Models\Entry;
use App\Models\Trade;
use App\Models\Item;
use App\Models\Character;
use App\Models\User;
use App\Exceptions\TradeClosedException;
use App\Exceptions\TradeNotAllowedException;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class FulfillTrade
{
    use AsAction;

    /**
     * Expects a trade and corresponding offer item, swaps them between their characters, creates entries, and closes the trade.
     *
     * @param Trade $trade
     * @param Item $offeredItem
     */
    public function handle(Trade $trade, Item $offeredItem)
    {
        $tradeCharacter = $trade->character;
        $tradeItem = $trade->item;
        $offerCharacter = $offeredItem->character;

        $currentUser = Auth::user();
        $offerUser = $offerCharacter->user;

        if (!$currentUser->characters->contains($tradeCharacter)) {
            throw new TradeNotAllowedException();
        }

        if ($trade->status == Trade::STATUS_CLOSED) {
            throw new TradeClosedException();
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

        foreach ($trade->offers as $offer) {
            if ($offer->id == $offeredItem->id) {
                continue;
            }
            $trade->offers()->detach($offer->id);
        }

        $trade->status = Trade::STATUS_CLOSED;
        $trade->save();
    }
}
