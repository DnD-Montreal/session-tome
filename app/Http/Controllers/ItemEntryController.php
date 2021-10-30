<?php

namespace App\Http\Controllers;

use App\Http\Requests\ItemEntryStoreRequest;
use Illuminate\Http\Request;
use App\Models\Item;

class ItemEntryController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
        'item_id' => 'required', 'integer', 'exists:item,id',
        'entry_id' => 'required', 'integer', 'exists:entries,id'
       ]);

        $item = Item::findorFail($request['item_id']);
        $item->entry()->associate($request['entry_id']);
        $item->save();

        return redirect()->route('item-entry.store');
    }
}
