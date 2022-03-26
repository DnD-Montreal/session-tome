<?php

namespace App\Http\Controllers;

use App\Models\Adventure;
use App\Models\Campaign;
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
            ->with('character', 'adventure', 'items', 'campaign')
            ->orderBy('date_played', 'desc')
            ->get();
        $characters = Auth::user()->characters;

        // not using compact to allow for partial reloads
        return Inertia::render('DMEntry/DMEntry', [
            'entries' => $entries,
            'characters' => $characters,
            'adventures' => fn () => Adventure::filtered($search)->get(['id', 'title', 'code']),
            'campaigns' => fn () => Campaign::filtered($search)->whereRelation('users', 'id', Auth::id())->get(['id', 'title']),
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

        if ($campaignId = $request->get("campaign_id")) {
            $campaign = Campaign::where('id', $campaignId);
            $adventure = Campaign::where('id', $campaignId)->first()->adventure();
        } else {
            $adventure = Adventure::filtered($search);
            $campaign = Campaign::filtered($search)
                ->whereHas('users', function ($query) {
                    return $query
                        ->where('id', Auth::id())
                        ->where('is_dm', true);
                });
        }

        // not using compact to allow for partial reloads
        return Inertia::render('Entry/Create/DmEntryCreate', [
            'characters' => $characters,
            'adventures' => fn () => $adventure->get(['id', 'title', 'code']),
            'campaigns' => fn () => $campaign->get(['id', 'title']),
        ]);
    }
}
