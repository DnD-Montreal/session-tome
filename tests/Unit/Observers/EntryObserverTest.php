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

        //create model instances
        $userA = User::factory()->create();
        Auth::loginUsingId($userA->id);
        $userB = User::factory()->create();
        $userGM = User::factory()->create();
        $characterA = Character::factory()->create();
        $characterB = Character::factory()->create();

        //create relationships between instances
        $characterA->user()->associate($userA);
        $characterB->user()->associate($userB);
        $characterA->campaigns()->attach($campaign);
        $characterB->campaigns()->attach($campaign);
        $campaign->users()->attach($userGM, ['is_dm' => true]);

        //get entry count before running the test, to ensure count only increases by 1
        $characterACampaignEntriesCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterA->id)
            ->where('type', Entry::TYPE_GAME)
            ->get()
            ->count();

        $characterBCampaignEntriesCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->where('type', Entry::TYPE_GAME)
            ->get()
            ->count();

        $GMCampaignEntryCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('user_id', $userGM->id)
            ->where('type', Entry::TYPE_DM)
            ->get()
            ->count();

        //create a character entry, firing the observer
        $characterA->entries()->create([
            'campaign_id' => $campaign->id,
            'user_id' => $userA->id,
            'type' => Entry::TYPE_GAME,
        ]);

        //Get the entries on the models after the triggering action
        $characterBCampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->where('type', Entry::TYPE_GAME)
            ->get();

        $characterACampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->where('type', Entry::TYPE_GAME)
            ->get();

        $GMCampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('user_id', $userGM->id)
            ->where('type', Entry::TYPE_DM)
            ->get();

        //assert that one new entry has been created on each
        $this->AssertCount($characterACampaignEntriesCountBeforeEntryCreation + 1, $characterACampaignEntries);
        $this->AssertCount($characterBCampaignEntriesCountBeforeEntryCreation + 1, $characterBCampaignEntries);
        $this->AssertCount($GMCampaignEntryCountBeforeEntryCreation + 1, $GMCampaignEntries);

        $characterACampaignEntriesCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterA->id)
            ->where('type', Entry::TYPE_GAME)
            ->get()
            ->count();

        $characterBCampaignEntriesCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->where('type', Entry::TYPE_GAME)
            ->get()
            ->count();

        $GMCampaignEntryCountBeforeEntryCreation = Entry::where('campaign_id', $campaign->id)
            ->where('user_id', $userGM->id)
            ->where('type', Entry::TYPE_DM)
            ->get()
            ->count();


        // Create a GM entry and test that character entries are created
        Entry::create([
            'user_id'=> $userGM->id,
            'campaign_id' => $campaign->id,
            'type' => Entry::TYPE_DM,
        ]);

        $characterBCampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterB->id)
            ->where('type', Entry::TYPE_GAME)
            ->get();

        $characterACampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('character_id', $characterA->id)
            ->where('type', Entry::TYPE_GAME)
            ->get();

        $GMCampaignEntries = Entry::where('campaign_id', $campaign->id)
            ->where('user_id', $userGM->id)
            ->where('type', Entry::TYPE_DM)
            ->get();

        $this->AssertCount($characterACampaignEntriesCountBeforeEntryCreation + 1, $characterACampaignEntries);
        $this->AssertCount($characterBCampaignEntriesCountBeforeEntryCreation + 1, $characterBCampaignEntries);
        $this->AssertCount($GMCampaignEntryCountBeforeEntryCreation + 1, $GMCampaignEntries);
    }
}
