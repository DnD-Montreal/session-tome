<?php

namespace App\Http\Controllers;

use App\Facades\AdventuresLeague;
use Illuminate\Http\Request;

class AdventuresLeagueImportController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if ($request->hasFile('logs') and $request->file('logs')->isValid()) {
            $character = AdventuresLeague::getCharacter($request->file('logs')->getRealPath());
            $character->save();

            $character->stubEntries();

            return response([
                'success' => true,
                'data' => $character->refresh()->load('entries')
            ]);
        } else {
            return response([
                'success' => false,
                'errors' => "Adventure's League Log File Error"
            ]);
        }
    }
}
