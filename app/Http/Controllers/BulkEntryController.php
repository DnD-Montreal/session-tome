<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkEntryStoreRequest;
use App\Models\Adventure;
use App\Models\Character;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BulkEntryController extends Controller
{
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

        return Inertia::render('Character/Detail/Entry/Create/BulkEntryCreate', compact('adventures', 'character'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function store(BulkEntryStoreRequest $request)
    {
        $data = $request->validated();

        $data['end_date'] = Carbon::parse($data['end_date']) ?? now();
        $data['start_date'] = Carbon::parse($data['start_date']);

        $difference = $data['end_date']->diffInWeeks($data['start_date']);
        $entriesCount = round($difference * $data['frequency']);

        $character = Character::findOrFail($data['character_id']);
        $character->stubEntries(0, $entriesCount, $data['adventure']['id']);
        $entries = $character->entries()->where('created_at', ">=", now())->get();

        foreach ($entries as $index => $entry) {
            $datePlayed = $data['start_date']->addWeeks($index/$data['frequency']);
            $entry->date_played = $datePlayed->isBefore($data['end_date']) ? $datePlayed : $data['end_date'];
            // N+1 consider refactor?
            $entry->save();
        }

        return redirect(route('character.show', [
            'character' => $character->refresh()
        ]));
    }
}
