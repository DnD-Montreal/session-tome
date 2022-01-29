<?php

namespace App\Http\Controllers;

use App\Models\Adventure;
use App\Models\Entry;
use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DMEntryController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $search = $request->get("search", "");
        $entries = Entry::where('type', Entry::TYPE_DM)
            ->where('user_id', Auth::id())
            ->with('character', 'adventure', 'items')
            ->orderBy('date_played', 'desc')
            ->get();
        $characters = Auth::user()->characters;

        return Inertia::render('DMEntry/DMEntry', [
            'entries' => $entries,
            'characters' => $characters,
            'adventures' => fn () => Adventure::filtered($search)->get(['id', 'title', 'code']),
        ]);
    }

    /**
     * @param Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $search = $request->get("search");
        $characters = Character::where('user_id', Auth::user()->id)->get();
        $campaigns = Auth::user()->campaigns;

        return Inertia::render('Entry/Create/DmEntryCreate', [
            'characters' => $characters,
            'campaigns' => $campaigns,
            'adventures' => fn () => Adventure::filtered($search)->get(['id', 'title', 'code']),
        ]);
    }
}
