<?php

namespace App\Http\Controllers;

use App\Http\Requests\CampaignStoreRequest;
use App\Http\Requests\CampaignUpdateRequest;
use App\Models\Campaign;
use App\Models\User;
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
        $user = User::where('id', Auth::user()->id)->get();
        $userCampaigns = $user->first()->campaigns()->get();

        return Inertia::render('Campaign/Campaign', compact('userCampaigns'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('campaign.create');
    }

    /**
     * @param \App\Http\Requests\CampaignStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CampaignStoreRequest $request)
    {
        $campaign = Campaign::create($request->validated());

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
