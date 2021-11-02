<?php

namespace App\Http\Controllers;

use App\Http\Requests\AttachDMEntryRequest;
use App\Models\Character;
use App\Models\Entry;

class CharacterBulkAttachDMEntryController extends Controller
{
    /**
     * @param \App\Http\Requests\AttachDMEntryRequestController $request
     * @param \App\Models\Character $character
     * @return \Illuminate\Http\Response
     */
    public function update(AttachDMEntryRequest $request, Character $character)
    {
        $validated = $request->validated();
        $entries = Entry::findOrFail($validated['dm_entry_ids']);
        $character->entries()->saveMany($entries);

        return redirect()->route('dm-entry.index');
    }
}
