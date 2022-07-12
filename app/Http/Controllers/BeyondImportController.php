<?php

namespace App\Http\Controllers;

use App\Facades\Beyond;
use Illuminate\Http\Request;

class BeyondImportController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(Request $request)
    {
        $link = $request->validate([
            'beyond_link' => "regex:/^(https:\/\/www\.dndbeyond\.com).+[0-9]+$/i",
        ])['beyond_link'];

        $character = Beyond::getCharacter($link);
        $character->save();

        $character->stubEntries();

        return redirect(route('character.show', ['character' => $character->refresh()->load('entries')]));
    }
}
