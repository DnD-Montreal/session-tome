<?php

namespace App\Http\Controllers;

use App\Exceptions\TradeException;
use App\Http\Requests\TradeFulfillRequest;
use App\Actions\FulfillTrade;
use App\Models\Item;
use App\Models\Trade;
use Illuminate\Http\RedirectResponse;

class TradeFulfillmentController extends Controller
{
    /**
     * @param TradeFulfillRequest $request
     * @param Trade $trade
     * @return RedirectResponse
     */
    public function store(TradeFulfillRequest $request, Trade $trade)
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
