<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Campaign;
use App\Models\User;
use App\Models\Character;
use Illuminate\Support\Facades\Auth;

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
            'character_id' => "required|exists:characters,id",
            'code' => "required|string"
        ]);

        $user = User::find(Auth::id())->first();
        $character = Character::findOrFail($data['character_id'])->first();
        $campaign = Campaign::where('code', '=', $data['code']);

        if ($campaign->exists()) {
            $campaign = $campaign->first();
            $user->campaigns()->attach($campaign);
            $character->campaigns()->attach($campaign);
        } else {
            return back()->withErrors([
                'code' => "The provided code does not exist!"
            ]);
        }

        return redirect('campaign.index');
    }
}
