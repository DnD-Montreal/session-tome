<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Log;

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
        ])['code'] ?? null;

        $campaign = Campaign::with('characters', 'users')->where('code', $code)->first();

        return Inertia::render('Campaign/Registration/Create/CampaignRegistrationCreate', compact('characters', 'campaign', 'code'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Contracts\Foundation\Application|\Illuminate\Http\RedirectResponse|\Illuminate\Http\Response|\Illuminate\Routing\Redirector
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'character_id' => "nullable|sometimes|exists:characters,id",
            'code' => "required|string"
        ]);

        $user = Auth::user();
        $campaign = Campaign::where('code', $data['code'])->firstOrFail();

        if ($request->has('character_id')) {
            $user->campaigns()->attach($campaign, ['is_dm' => false, 'is_owner' => false]);
            $character = Character::findOrFail($data['character_id']);
            $character->campaigns()->attach($campaign);
        } else {
            $user->campaigns()->attach($campaign, ['is_dm' => true, 'is_owner' => false]);
        }

        return redirect()->route('campaign.index');
    }

    public function destroy(Request $request, Campaign $campaignRegistration)
    {
        $data = $request->validate([
            'user_id' => 'sometimes|array'
        ])['user_id'] ?? null;
        Log::info('validated');
        $user = Auth::user();
        $isCampaignOwner = $campaignRegistration->users()->where('user_id', $user->id)->first()->pivot->is_owner;

        if (!$request->has('user_id')) {
            return redirect()->back()->withErrors(['error' => "You need to specify a user."]);
        }

        if (!$isCampaignOwner) {
            return redirect()->back()->withErrors(['error' => "You don't have permission to do that."]);
        }

        $campaignCharacters = $campaignRegistration->characters()->whereIn('user_id', $data['user_id'])->get();

        $campaignRegistration->users()->detach($data['user_id']);
        $campaignRegistration->characters()->detach($campaignCharacters);

        $campaignRegistration->code = $campaignRegistration->generateCode();
        $campaignRegistration->save();

        return redirect('campaign.index');
    }
}
