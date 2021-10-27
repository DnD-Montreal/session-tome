<?php

namespace App\Http\Controllers;

use App\Facades\AdventuresLeague;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdventuresLeagueImportController extends Controller
{
    /**
     * Show the Import index
     *
     * @param Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        return Inertia::render('Character/Import/CharacterImport');
    }

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
