<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntryStoreRequest;
use App\Models\Adventure;
use App\Models\Entry;
use App\Models\Character;
use App\Models\Item;
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
            ->get();
        $characters = Auth::user()->characters;
        $adventures = Adventure::filtered($search)->get(['id', 'title', 'code']);

        return Inertia::render('DMEntry/DMEntry', compact('entries', 'adventures', 'characters'));
    }

    /**
     * @param Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $search = $request->get("search");
        $adventures = Adventure::filtered($search)->get(['id', 'title', 'code']);
        $characters = Character::where('user_id', Auth::user()->id)->get();
        $campaigns = Auth::user()->campaigns;

        return Inertia::render('Entry/Create/DmEntryCreate', compact('adventures', 'characters', 'campaigns'));
    }
}
