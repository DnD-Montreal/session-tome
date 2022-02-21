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
    public function create(Request $request, Trade $trade)
    {
        $validItems = Auth::user()->items()->where('rarity', $trade->item->rarity);

        // will be replaced when page component is created...
        return view('offer.create', compact('validItems', 'trade'));
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

        $trade = Trade::findOrFail($offerData['trade_id']);
        $dataItem = Item::findOrFail($offerData['item_id']);
        $offerItem = ($dataItem->rarity == $trade->item()->get()[0]->rarity) ? $dataItem : null;

        // Attach offered item that meets rarity criteria
        if (!is_null($offerItem)) {
            $trade->offers()->attach($offerItem);
        } else {
            return Redirect::back()->withErrors(['error' => 'Offer does not meet rarity requirements']);
        }

        return redirect()->back();
    }
}
