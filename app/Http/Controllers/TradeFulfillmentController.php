<?php

namespace App\Http\Controllers;

use App\Exceptions\TradeException;
use App\Http\Requests\TradeFulfillRequest;
use App\Actions\FulfillTrade;
use App\Models\Item;
use App\Models\Trade;
use Inertia\Inertia;

class TradeFulfillmentController extends Controller
{
    /**
     * @param App\Http\Requests\TradeFulfillRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(TradeFulfillRequest $request, Trade $trade)
    {
        $offeredItem = Item::findOrFail($request->get('offered_item_id'));

        try {
            FulfillTrade::run($trade, $offeredItem);
        } catch (TradeException $e) {
            return redirect()->back()->withException($e);
        }

        return redirect()->back();
    }
}
