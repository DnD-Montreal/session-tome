<?php

namespace App\Http\Controllers;

use App\Models\Character;
use Carbon\Carbon;
use Illuminate\Http\Request;

class BulkEntryController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'character_id' => "required|exists:characters,id",
            'adventure_id' => "nullable|exists:adventures,id",
            'start_date' => "required|date",
            'end_date' => "nullable|date",
            // How often a session was ran, measured in times/week
            // (1 -> once per week, 2 -> twice per week, 0.5 -> once every 2 weeks)
            'frequency' => "required|numeric",

        ]);

        $data['end_date'] = Carbon::parse($data['end_date']) ?? now();
        $data['start_date'] = Carbon::parse($data['start_date']);

        $difference = $data['end_date']->diffInWeeks($data['start_date']);
        $entriesCount = round($difference * $data['frequency']);

        $character = Character::findOrFail($data['character_id']);
        $character->stubEntries($entriesCount, 0, $data['adventure_id']);


        // or inertia response?
        return response([
            'success' => true,
            'data' => $character->refesh()->load('entries')
        ]);
    }
}
