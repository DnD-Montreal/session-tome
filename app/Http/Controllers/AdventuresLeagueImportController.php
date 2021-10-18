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
        if ($request->hasFile('logs')) {
            $character = AdventuresLeague::getCharacter($request->file('logs')->getRealPath());
            if (is_null($character)) {
                return response([
                    'success' => false,
                    'errors' => "Adventure's League Log File Error: Export File Format Changed",
                ], 400);
            }

            $character->save();

            return response([
                'success' => true,
                'data' => $character->refresh()->load('entries')
            ]);
        } else {
            return response([
                'success' => false,
                'errors' => "Adventure's League Log File Error"
            ], 400);
        }
    }
}
