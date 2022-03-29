<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemStoreRequest;
use App\Http\Requests\ItemUpdateRequest;
use App\Models\Character;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Inertia;

class ItemController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $character = null;
        $characterId = $request->get('character_id');
        $items = Item::where('character_id', $characterId)->get();
        $character = Character::findOrFail($characterId);

        if ($character->user_id !== Auth::id() && $character->status == 'private') {
            throw new UnauthorizedException(
                "You're not allowed to see that character's details.",
                401
            );
        }

        return Inertia::render('Item/Item', compact('items', 'character'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Item $item
     * @return \Inertia\Response
     */
    public function show(Request $request, Item $item)
    {
        $character = $item->character;
        return Inertia::render('Item/Detail/ItemDetail', compact('item', 'character'));
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

        return redirect()->back();
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Item $item
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, Item $item)
    {
        $character_id = $item->character_id;
        $item->delete();
        $character = Character::find($character_id);
        $items = $character->items;

        if ($character_id) {
            return redirect()->route('item.index', compact('character_id'));
        } else {
            return redirect()->route('dm-entry.index');
        }
    }
}
