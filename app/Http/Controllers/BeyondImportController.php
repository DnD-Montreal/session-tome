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
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $link = $request->validate([
            'beyond_link' => "regex:/(.*(www\.dndbeyond\.com).*[0-9]+|[0-9]+)/"
        ])['beyond_link'];

        $character = Beyond::getCharacter($link);
        $character->save();

        $character->stubEntries();

        return response([
            'success' => true,
            'data' => [
                'character' => $character->refresh(),
                'entries' => $character->entries
            ]
        ]);
    }
}
