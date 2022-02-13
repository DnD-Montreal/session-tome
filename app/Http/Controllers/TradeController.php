<?php

namespace App\Http\Controllers;

use App\Http\Requests\TradeStoreRequest;
use App\Http\Requests\TradeUpdateRequest;
use App\Models\Trade;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;

class TradeController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $trades = Trade::where('status', 'open')
                    ->has('items')->with('items')
                    ->filtered($request->get('requested_items'))
                    ->filtered($request->get('description'));

        if ($itemName = $request->get('item_name')) {
            $trades = $trades->whereHas('item', function (Builder $q) use ($itemName) {
                $q->where('name', 'like', "%{$itemName}%");
            });
        }

        if ($itemDescription = $request->get('item_description')) {
            $trades = $trades->whereHas('item', function (Builder $q) use ($itemDescription) {
                $q->where('description', 'like', "%{$itemDescription}%");
            });
        }

        if ($itemRarity = $request->get('item_rarity')) {
            $trades = $trades->whereHas('item', function (Builder $q) use ($itemRarity) {
                $q->where('rarity', 'like', "%{$itemRarity}%");
            });
        }

        return view('trade.index', compact('trades'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('trade.create');
    }

    /**
     * @param \App\Http\Requests\TradeStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(TradeStoreRequest $request)
    {
        $trade = Trade::create($request->validated());

        $request->session()->flash('trade.id', $trade->id);

        return redirect()->route('trade.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Trade $trade
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Trade $trade)
    {
        return view('trade.show', compact('trade'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Trade $trade
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Trade $trade)
    {
        return view('trade.edit', compact('trade'));
    }

    /**
     * @param \App\Http\Requests\TradeUpdateRequest $request
     * @param \App\Models\Trade $trade
     * @return \Illuminate\Http\Response
     */
    public function update(TradeUpdateRequest $request, Trade $trade)
    {
        $trade->update($request->validated());

        $request->session()->flash('trade.id', $trade->id);

        return redirect()->route('trade.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Trade $trade
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Trade $trade)
    {
        $trade->delete();

        return redirect()->route('trade.index');
    }
}
