<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignStoreRequest;
use App\Http\Requests\CampaignUpdateRequest;
use App\Models\Campaign;
use App\Models\User;
use App\Models\Character;
use App\Models\Adventure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $characters = Character::where('user_id', Auth::user()->id)->get();
        $campaigns = Auth::user()
            ->campaigns()
            ->get();
        $campaigns->load('characters')->where('user_id', Auth::user()->id);
        return Inertia::render('Campaign/Campaign', compact('campaigns', 'characters'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            'search' => 'sometimes|string',
        ]);
        $search = $data['search'] ?? '';
        $adventures = Adventure::filtered($search)->get(['id', 'title', 'code']);
        $characters = Character::where('user_id', Auth::user()->id)->get();
        return Inertia::render(
            'Campaign/Create/CampaignCreate',
            compact('characters', 'adventures')
        );
    }

    /**
     * @param \App\Http\Requests\CampaignStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CampaignStoreRequest $request)
    {
        $data = $request->validated();

        $campaign = Campaign::create($data);

        //user joins capaign
        $user = Auth::user();

        if ($request->has('character_id')) {
            $user->campaigns()->attach($campaign, ['is_dm' => false]);
            $character = Character::findOrFail($data['character_id']);
            $character->campaigns()->attach($campaign);
        } else {
            $user->campaigns()->attach($campaign, ['is_dm' => true]);
        }

        $request->session()->flash('campaign.id', $campaign->id);

        return redirect()->route('campaign.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Campaign $campaign
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Campaign $campaign)
    {
        return view('campaign.show', compact('campaign'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Campaign $campaign
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Campaign $campaign)
    {
        return view('campaign.edit', compact('campaign'));
    }

    /**
     * @param \App\Http\Requests\CampaignUpdateRequest $request
     * @param \App\Models\Campaign $campaign
     * @return \Illuminate\Http\Response
     */
    public function update(CampaignUpdateRequest $request, Campaign $campaign)
    {
        $campaign->update($request->validated());

        $request->session()->flash('campaign.id', $campaign->id);

        return redirect()->route('campaign.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Campaign $campaign
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Campaign $campaign)
    {
        $campaign->delete();

        return redirect()->route('campaign.index');
    }
}
