<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignStoreRequest;
use App\Http\Requests\CampaignUpdateRequest;
use App\Models\Campaign;
use App\Models\Entry;
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
        $data = $request->validate([
            'search' => 'sometimes|string',
        ]);
        $search = $data['search'] ?? '';
        $characters = Character::where('user_id', Auth::user()->id)->get();
        $campaigns = Auth::user()->campaigns()->get();
        $campaigns->load('characters')->where('user_id', Auth::user()->id);
        $campaigns->load('adventure');

        return Inertia::render('Campaign/Campaign', [
            'campaigns' => $campaigns,
            'characters' => $characters,
            'adventures' => Adventure::filtered($search)->get(['id', 'title', 'code'])
        ]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $data = $request->validate([
            'search' => 'sometimes|string',
        ]);
        $search = $data['search'] ?? '';
        $adventures = Adventure::filtered($search)->get(['id', 'title', 'code']);
        $characters = Character::where('user_id', Auth::user()->id)->get();
        return Inertia::render('Campaign/Create/CampaignCreate', compact('characters', 'adventures'));
    }

    /**
     * @param \App\Http\Requests\CampaignStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CampaignStoreRequest $request)
    {
        $data = $request->validated();
        // TODO: Look into using prepareForValidation in Request Validator
        $data['adventure_id'] = $data['adventure']['id'];
        unset($data['adventure']['id']);

        $campaign = Campaign::create($data);

        //user joins campaign
        $user = Auth::user();

        if ($request->has('character_id')) {
            $user->campaigns()->attach($campaign, ['is_dm' => false, 'is_owner' => true]);
            $character = Character::findOrFail($data['character_id']);
            $character->campaigns()->attach($campaign);
        } else {
            $user->campaigns()->attach($campaign, ['is_dm' => true, 'is_owner' => true]);
        }

        $request->session()->flash('campaign.id', $campaign->id);

        return redirect()->route('campaign.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Campaign $campaign
     * @return \Inertia\Response
     */
    public function show(Request $request, Campaign $campaign)
    {
        $campaign = $campaign->load('characters', 'adventure');
        $userCharacter = $campaign->characters()
            ->where('user_id', Auth::id())
            ->with(['entries' => function ($q) use ($campaign) {
                return $q->where('campaign_id', $campaign->id);
            }, 'entries.adventure'])
            ->first();
        $characters = Auth::user()->characters;
        $search = $request->get('search', "");

        return Inertia::render('Campaign/Detail/CampaignDetail', [
            'campaign' => $campaign,
            'userCharacter' => $userCharacter,
            'characters' => $characters,
            'adventures' => Adventure::filtered($search)->get(['id', 'title', 'code']),
            'gameMasters' => fn () => User::filtered($search)->get(['id', 'name']),
        ]);
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
        $data = $request->validated();

        if (isset($data['character_id'])) {
            $playerCharacters = $campaign->characters()
                ->where('user_id', "!=", Auth::id())
                ->pluck('id');
            $campaign->characters()->sync($playerCharacters->prepend($data['character_id']));
        }

        $campaign->update($data);

        $request->session()->flash('campaign.id', $campaign->id);

        return redirect()->back();
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
