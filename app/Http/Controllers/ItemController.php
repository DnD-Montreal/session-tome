<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemStoreRequest;
use App\Http\Requests\ItemUpdateRequest;
use App\Models\Item;
use Illuminate\Http\Request;

class ItemController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($characterId = $request->get('character_id')) {
            $items = Item::where('character_id', $characterId)->get();
        } else {
            $items = [];
        }

        return view('item.index', compact('items'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('item.create');
    }

    /**
     * @param \App\Http\Requests\ItemStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(ItemStoreRequest $request)
    {
        $item = Item::create($request->validated());

        $request->session()->flash('item.id', $item->id);

        return redirect()->route('item.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Item $item
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Item $item)
    {
        return view('item.show', compact('item'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Item $item
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Item $item)
    {
        return view('item.edit', compact('item'));
    }

    /**
     * @param \App\Http\Requests\ItemUpdateRequest $request
     * @param \App\Models\Item $item
     * @return \Illuminate\Http\Response
     */
    public function update(ItemUpdateRequest $request, Item $item)
    {
        $item->update($request->validated());

        $request->session()->flash('item.id', $item->id);

        return redirect()->route('item.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Item $item
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Item $item)
    {
        $item->delete();

        return redirect()->route('item.index');
    }
}
