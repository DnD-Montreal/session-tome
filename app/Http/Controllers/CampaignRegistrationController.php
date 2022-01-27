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

        $user = User::find(Auth::id())->first();
        $campaign = Campaign::where('code', $data['code']);

        if ($campaign->exists()) {
            $campaign = $campaign->first();
            if ($request->has('character_id')) {
                $user->campaigns()->attach($campaign, ['is_dm' => false]);
                $character = Character::findOrFail($data['character_id'])->first();
                $character->campaigns()->attach($campaign);
            } else {
                $user->campaigns()->attach($campaign, ['is_dm' => true]);
            }
        } else {
            return back()->withErrors([
                'code' => "The provided code does not exist!"
            ]);
        }

        return redirect('campaign.index');
    }
}
