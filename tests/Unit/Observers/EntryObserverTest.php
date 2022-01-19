<?php

namespace Tests\Unit\Observers;

use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\User;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class EntryObserverTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function character_entry_creation_triggers_campaign_entry_creation()
    {
        $campaign = Campaign::factory()->create();

        $userA = User::factory()->create();
        Auth::loginUsingId($userA->id);
        $userB = User::factory()->create();
        $userGM = User::factory()->create();

        $characterA = Character::factory()->create();
        $characterB = Character::factory()->create();

        $characterA->user()->associate($userA);
        $characterB->user()->associate($userB);

        $characterA->campaigns()->attach($campaign);
        $characterB->campaigns()->attach($campaign);

        $campaign->users()->attach($userGM, ['is_dm' => true]);

        $characterBCampaignEntriesCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->get()
            ->count();

        $GMCampaignEntryCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('user_id', $userGM->id)
            ->get()
            ->count();

        $characterA->entries()->create([
            'campaign_id' => $campaign->id,
            'user_id' => $userA->id,
        ]);

        $characterBCampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->get();

        $GMCampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('user_id', $userGM->id)
            ->get();

        $this->AssertCount($characterBCampaignEntriesCountBeforeEntryCreation + 1, $characterBCampaignEntries);
        $this->AssertCount($GMCampaignEntryCountBeforeEntryCreation + 1, $characterBCampaignEntries);
    }
}
