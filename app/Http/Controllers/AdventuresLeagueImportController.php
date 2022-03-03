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
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        if ($request->hasFile('logs')) {
            try {
                $character = AdventuresLeague::getCharacter($request->file('logs')->getRealPath());
            } catch (\Exception $e) {
                return back()->withException($e);
            }
            $character->save();
            return redirect(route('character.show', ['character' => $character->refresh()->load('entries')]));
        } else {
            return back()->withException(new \Exception("Adventure's League Log File Error", 400));
        }
    }
}
