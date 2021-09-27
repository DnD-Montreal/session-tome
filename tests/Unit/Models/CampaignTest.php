<?php

namespace Tests\Unit\Models;

use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class CampaignTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;


    /**
     * @test
     */
    public function can_belong_to_adventure()
    {
        $campaign = Campaign::factory(1)->create()[0];

        $this->assertcount(1, $campaign->adventure()->get());
    }

    /**
     * @test
     */
    public function can_belong_to_characters()
    {
        ## Assign
        $character = Character::factory(3)->create();
        $campaign = Campaign::factory(1)->create()[0];

        # Act
        $campaign->characters()->attach($character);

        # Assert
        $this->assertCount(3, $campaign->characters);
    }

    /**
     * @test
     */
    public function can_belong_to_users()
    {
        //User::factory(1)->create();
        $user = User::factory(2)->create();
        $campaign = Campaign::factory(1)->create()[0];

        $campaign->users()->attach($user);

        $this->assertcount(2, $campaign->users);
    }

    /**
     * @test
     */
    public function can_have_entries()
    {
        Entry::factory(1)->create();
        $campaign = Campaign::first();

        $this->assertcount(1, $campaign->entries()->get());
    }
}
