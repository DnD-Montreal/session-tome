<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\User;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaignRegistrationController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $characters = Auth::user()->characters;

        $code = $request->validate([
            'code' => "sometimes|string"
        ])['code']?? null;

        $campaign = Campaign::where('code', $code)->first();

        $code = is_null($campaign) ? $campaign : $campaign->code;

        return Inertia::render('Campaign/Detail/CampaignDetail', compact('characters', 'campaign', 'code'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'character_id' => "sometimes|exists:characters,id",
            'code' => "required|string"
        ]);

        $user = Auth::user();
        $campaign = Campaign::where('code', $data['code'])->firstOrFail();

        if ($request->has('character_id')) {
            $user->campaigns()->attach($campaign, ['is_dm' => false]);
            $character = Character::findOrFail($data['character_id']);
            $character->campaigns()->attach($campaign);
        } else {
            $user->campaigns()->attach($campaign, ['is_dm' => true]);
        }

        return redirect('campaign.index');
    }
}
