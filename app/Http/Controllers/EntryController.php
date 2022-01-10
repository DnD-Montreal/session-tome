<?php

namespace App\Http\Controllers;

use App\Actions\CreateEntryItems;
use App\Http\Requests\EntryStoreRequest;
use App\Http\Requests\EntryUpdateRequest;
use App\Models\Character;
use App\Models\Adventure;
use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $charId = $request->validate([
            'character_id' => "required|exists:characters,id|integer"
        ])['character_id'];

        $character = Character::where('user_id', Auth::id())
            ->findOrFail($charId);

        $adventures = Adventure::all();

        return Inertia::render('Character/Detail/Entry/Create/EntryCreate', compact('adventures', 'character'));
    }

    /**
     * @param \App\Http\Requests\EntryStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(EntryStoreRequest $request)
    {
        $entryData = collect($request->validated())->except('items');
        $itemData = collect($request->validated())->only('items');

        if ($itemData->has('items')) {
            $itemData = $itemData['items'];
        }

        if ($itemData instanceof Collection) {
            $itemData = $itemData->toArray();
        }

        //possibly implement as function for reusability
        if ($entryData->get('choice') == 'advancement') {
            // advancement: increment character's level
            $entryData['levels'] = 1;
            $itemData = [];
        } elseif ($entryData->get('choice') == 'magic_item') {
            // magic_item: attach item to character of choice, and set entry's levels to 0
            $itemData = [$itemData[0] ?? []];
            $entryData['levels'] = 0;
        } elseif ($entryData->get('choice') == 'campaign_reward') {
            // campaign reward: set levels = 0, no item(s), should contain custom note
            $itemData = [];
            $entryData['levels'] = 0;
        }

        $entry = Entry::create($entryData->toArray());
        // attach any associated items to the entry in question.
        CreateEntryItems::run($entry, $itemData ?? []);
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(EntryUpdateRequest $request, Entry $entry)
    {
        $entryData = collect($request->validated())->except('items');
        $itemData = collect($request->validated())->only('items');

        if ($itemData->has('items')) {
            $itemData = $itemData['items'];
        }

        if ($itemData instanceof Collection) {
            $itemData = $itemData->toArray();
        }

        //replace with function call when implemented
        if ($entryData->get('choice') == 'advancement') {
            // advancement: increment character's level
            $entryData['levels'] = 1;
            $itemData = [];
        } elseif ($entryData->get('choice') == 'magic_item') {
            // magic_item: attach item to character of choice, and set entry's levels to 0
            $itemData = [$itemData[0] ?? []];
            $entryData['levels'] = 0;
        } elseif ($entryData->get('choice') == 'campaign_reward') {
            // campaign reward: set levels = 0, no item(s), should contain custom note
            $itemData = [];
            $entryData['levels'] = 0;
        }

        $entry->update($entryData->toArray());
        CreateEntryItems::run($entry, $itemData ?? []);
        $request->session()->flash('entry.id', $entry->id);

        if ($request->type == Entry::TYPE_DM) {
            return redirect()->route('dm-entry.index');
        }

        return redirect()->route('entry.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, Entry $entry)
    {
        $entry->delete();

        return redirect()->route('entry.index');
    }
}
