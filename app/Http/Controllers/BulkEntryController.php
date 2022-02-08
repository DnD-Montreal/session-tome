<?php

namespace App\Http\Controllers;

use App\Http\Requests\BulkEntryStoreRequest;
use App\Models\Adventure;
use App\Models\Character;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
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
        $end = Carbon::parse($data['end_date'])->endOfDay();
        $dates = CarbonPeriod::since($data['start_date'])
            ->weeks(1/$data['frequency'])
            ->until($end)
            ->toArray();

        $entriesCount = count($dates);
        $character = Character::findOrFail($data['character_id']);


        $character->stubEntries(0, $entriesCount, $data['adventure']['id']);
        $character->entries()
            ->where('created_at', ">=", now())
            ->get()
            ->each(function ($entry, $key) use ($dates) {
                $entry->date_played = $dates[$key];
                $entry->save();
            });

        return redirect(route('character.show', [
            'character' => $character->refresh()
        ]));
    }
}
