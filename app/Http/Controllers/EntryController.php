<?php

namespace App\Http\Controllers;

use App\Actions\CreateEntryItems;
use App\Http\Requests\EntryStoreRequest;
use App\Http\Requests\EntryUpdateRequest;
use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EntryController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($userId = $request->get('user_id')) {
            $entries = Entry::where('user_id', $userId)->get();
        } else {
            $entries = Entry::where('user_id', Auth::user()->id)->get();
        }

        return view('entry.index', compact('entries'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('entry.create');
    }

    /**
     * @param \App\Http\Requests\EntryStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(EntryStoreRequest $request)
    {
        $entryData = collect($request->validated())->except('items');
        $itemData = collect($request->validated())->only('items');
        $entry = Entry::create($entryData->toArray());
        // attach any associated items to the entry in question.
        CreateEntryItems::run($entry, $itemData['items'] ?? []);

        $request->session()->flash('entry.id', $entry->id);

        if ($request->type == Entry::TYPE_DM) {
            return redirect()->route('dm-entry.index');
        }

        return redirect()->route('character.show', $entry->character_id);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Entry $entry)
    {
        return view('entry.show', compact('entry'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Entry $entry)
    {
        return view('entry.edit', compact('entry'));
    }

    /**
     * @param \App\Http\Requests\EntryUpdateRequest $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\Response
     */
    public function update(EntryUpdateRequest $request, Entry $entry)
    {
        $entry->update($request->validated());
        $request->session()->flash('entry.id', $entry->id);

        if ($request->type == Entry::TYPE_DM) {
            return redirect()->route('dm-entry.index');
        }

        return redirect()->route('entry.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Entry $entry)
    {
        $entry->delete();

        return redirect()->route('entry.index');
    }
}
