<?php

namespace App\Http\Controllers;

use App\Http\Requests\TradeStoreRequest;
use App\Http\Requests\TradeUpdateRequest;
use App\Models\Character;
use App\Models\Item;
use App\Models\Trade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use function PHPUnit\Framework\isNull;

class TradeOfferController extends Controller
{
    /**
     * Retrieve character's items that are valid to trade
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        //REQUEST DOES NOT HAVE TRADE_ID NOR CHARACTER_ID . VALIDATION FAILS
        $offerData = $request->validate([
            'trade_id' => 'required|exists:trades,id|integer',
            'character_id' => "required|exists:characters,id|integer",
        ]);

        $character = Character::where('user_id', Auth::id())
            ->findOrFail($offerData['character_id']);
        $trade = Trade::findOrFail($offerData['trade_id']);
        $tradeItem = $trade->item()->get();

        $validItems = $character->items()->where('tier', $tradeItem->tier);

        return view('offer.create', compact('validItems'));
    }

    /**
     * Retrieve Trade Offer to edit
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        //rrequest params passed in "headers" instead of request parameters...

        $offerData = $request->validate([
            'trade_id' => 'required|exists:trades,id|integer',
            'item_id' => 'required|exists:items,id|integer',
        ]);

        $trade = Trade::findOrFail($offerData['trade_id']);
        $item = Item::findOrFail($offerData['item_id']);

        return view('offer.edit', compact('item', 'trade'));
    }

    /**
     *store trade offer
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $offerData = $request->validate([
            'item_id' => 'required|exists:items,id|integer',
            'trade_id' => 'required|exists:trades,id|integer'
        ]);

        //findOrFail redundant?
        $trade = Trade::findOrFail($offerData['trade_id']);
        $dataItem = Item::findOrFail($offerData['item_id']);
        $offerItem = ($dataItem->tier == $trade->item()->get()[0]->tier) ? $dataItem : null;


        // Attach offered item that meets rarity criteria
        if (!is_null($offerItem)) {
            $trade->items()->attach($offerItem);
        }

        return redirect()->back();
    }

    /**
     * Update existing trade offer
     *
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Trade $trade
     * @param \App\Models\Item $item
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(Request $request)
    {
        //TRADE & ITEM EMPTY, might be problem with route?
        $offerData = $request->validate([
            'item_id' => 'required|exists:items,id|integer',
            'replace_id' => 'required|exists:items,id|integer',
            'trade_id' => 'required|exists:trades,id|integer'
        ]);

        //item to replace existing offer
        $oldOffer = Item::findOrFail($offerData['replace_id']);
        $newOffer = Item::findOrFail($offerData['item_id']);
        $trade = Trade::findOrFail($offerData['trade_id']);


        //does not work since $trade empty
        $newOffer = ($newOffer->tier == $trade->item()->get()[0]->tier) ? $newOffer : null;

        if (!is_null($newOffer)) {
            $trade->items()->detach($oldOffer);
            $trade->items()->attach($newOffer);
        }

        return redirect()->back();
    }
}
