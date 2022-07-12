<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignStoreRequest;
use App\Http\Requests\CampaignUpdateRequest;
use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CampaignController extends Controller
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $data = $request->validate([
            'search' => 'sometimes|string',
        ]);
        $search = $data['search'] ?? '';
        $characters = Character::where('user_id', Auth::user()->id)->get();
        $campaigns = Auth::user()->campaigns()->distinct()->get();
        $campaigns->load('characters')->where('user_id', Auth::user()->id);
        $campaigns->load('adventure');

        return Inertia::render('Campaign/Campaign', [
            'campaigns' => $campaigns,
            'characters' => $characters,
            'adventures' => Adventure::filtered($search)->get(['id', 'title', 'code']),
        ]);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
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
     * @param  \App\Http\Requests\CampaignStoreRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(CampaignStoreRequest $request)
    {
        $data = $request->validated();
        $campaign = Campaign::create($data);

        // User joins campaign
        $user = Auth::user();

        if (! empty($data['character_id'])) {
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
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Campaign  $campaign
     * @return \Inertia\Response
     */
    public function show(Request $request, Campaign $campaign)
    {
        $user = Auth::user();
        $campaign = $campaign->load([
            'characters',
            'adventure',
            'entries' => function (HasMany $q) use ($user) {
                return $q->whereRelation('user', 'user_id', $user->id);
            },
            'entries.adventure', ]);
        $userCharacter = $campaign->characters()
            ->where('user_id', Auth::id())
            ->first();
        $characters = $user->characters;
        $search = $request->get('search', '');

        return Inertia::render('Campaign/Detail/CampaignDetail', [
            'campaign' => $campaign,
            'userCharacter' => $userCharacter,
            'characters' => $characters,
            'adventures' => fn () => Adventure::filtered($search)->get(['id', 'title', 'code']),
            'gameMasters' => fn () => User::filtered($search)->get(['id', 'name']),
        ]);
    }

    /**
     * @param  \App\Http\Requests\CampaignUpdateRequest  $request
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(CampaignUpdateRequest $request, Campaign $campaign)
    {
        $data = $request->validated();

        // Fetch the character ids in the campaign that don't belong to the current user.
        $playerCharacters = $campaign->characters()
            ->where('user_id', '!=', Auth::id())
            ->pluck('id');

        if ($hasCharacter = ! empty($data['character_id'])) {
            // Add the new character ID to be attached, along with the rest of the characters.
            $campaign->characters()->sync($playerCharacters->prepend($data['character_id']));
        } else {
            // If we dont have a character_id then the user is becoming the DM...
            $campaign->characters()->sync($playerCharacters);
        }

        // If the user doesnt have a character, then they're a DM, otherwise, they're not.
        $campaign->users()->updateExistingPivot(Auth::user(), ['is_dm' => ! $hasCharacter]);

        $campaign->update($data);

        $request->session()->flash('campaign.id', $campaign->id);

        return redirect()->back();
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Campaign  $campaign
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, Campaign $campaign)
    {
        if (! $campaign->is_owner) {
            return redirect()->back()->withErrors(['errors' => "You're not allowed to do that because you're not the campaign owner."]);
        }

        $campaign->delete();

        return redirect()->route('campaign.index');
    }
}
