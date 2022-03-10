<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Campaign;
use App\Models\Character;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;
use Inertia\Testing\Assert;

class CampaignRegistrationControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Auth::login($this->user);
    }

    /**
     * @test
     */
    public function create_displays_view()
    {
        $campaign = Campaign::factory(1)->create()->first();

        $inputData = [
            'code' => $campaign->code
        ];
        $response = $this->get(route('campaign-registration.create', $inputData));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Campaign/Registration/Create/CampaignRegistrationCreate')
                ->has('campaign')
        );
    }

    /**
     * @test
     */
    public function store_registers_a_character_and_user_for_a_campaign()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $campaign = Campaign::factory(1)->create()->first();

        $inputData = [
            'character_id' => $character->id,
            'code' => $campaign->code
        ];
        $response = $this->post(route('campaign-registration.store', $inputData));

        $response->assertRedirect();
        $this->assertDatabaseCount('campaign_user', 1);
        $this->assertDatabaseCount('campaign_character', 1);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $this->user->id, 'campaign_id' => $campaign->id, 'is_dm' => false, 'is_owner' => false]);
        $this->assertDatabaseHas('campaign_character', ['character_id' =>$inputData['character_id'], 'campaign_id' =>$campaign->id]);
    }

    /**
     * @test
     */
    public function store_saves_as_admin()
    {
        $campaign = Campaign::factory(1)->create()->first();

        $inputData = [
            'code' => $campaign->code
        ];

        $response = $this->post(route('campaign-registration.store', $inputData));

        $response->assertRedirect();
        $this->assertDatabaseCount('campaign_user', 1);
        $this->assertDatabaseCount('campaign_character', 0);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $this->user->id, 'campaign_id' => $campaign->id, 'is_dm' => true, 'is_owner' => false]);
    }

    /**
     * @test
     */
    public function store_registers_with_invalid_campaign_code()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);

        $inputData = [
            'character_id' => $character->id,
            'code' => 'invalid code'
        ];
        $response = $this->post(route('campaign-registration.store', $inputData));

        $this->assertDatabaseCount('campaign_user', 0);
        $this->assertDatabaseCount('campaign_character', 0);
    }

    /**
     * @test
     */
    public function delete_user_and_character_from_a_campaign_as_a_campaign_owner()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $character = Character::factory()->create([
            'user_id' => $user1->id
        ]);

        $character2 = Character::factory()->create([
            'user_id' => $user2->id
        ]);

        $campaign = Campaign::factory()->create();

        $this->user->campaigns()->attach($campaign, ['is_dm' => false, 'is_owner' => true]);
        $user1->campaigns()->attach($campaign, ['is_dm' => true, 'is_owner' => false]);
        $user2->campaigns()->attach($campaign, ['is_dm' => false, 'is_owner' => false]);

        $campaign->characters()->attach($character);
        $campaign->characters()->attach($character2);


        $response = $this->delete(route('campaign-registration.destroy', $campaign), [
                'user_id' => [$character->user_id, $character2->user_id]
        ]);

        $response->assertRedirect();
        $this->assertDatabaseCount('campaign_user', 1);
        $this->assertDatabaseCount('campaign_character', 0);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $this->user->id, 'campaign_id' => $campaign->id, 'is_dm' => false, 'is_owner' => true]);
        $this->assertNotEquals($campaign->code, Campaign::first()->code);
    }

    /**
     * @test
     */
    public function delete_user_and_character_from_a_campaign_without_being_a_campaign_owner()
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $character = Character::factory()->create([
            'user_id' => $user1->id
        ]);

        $character2 = Character::factory()->create([
            'user_id' => $user2->id
        ]);

        $campaign = Campaign::factory()->create();

        $this->user->campaigns()->attach($campaign, ['is_dm' => false, 'is_owner' => false]);
        $user1->campaigns()->attach($campaign, ['is_dm' => false, 'is_owner' => true]);
        $user2->campaigns()->attach($campaign, ['is_dm' => true, 'is_owner' => false]);

        $campaign->characters()->attach($character);
        $campaign->characters()->attach($character2);

        $response = $this->delete(route('campaign-registration.destroy', $campaign), [
            'user_id' => [$character->user_id, $character2->user_id]
        ]);

        $response->assertRedirect();
        $this->assertDatabaseCount('campaign_user', 3);
        $this->assertDatabaseCount('campaign_character', 2);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $user1->id, 'campaign_id' => $campaign->id, 'is_dm' => false, 'is_owner' => true]);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $user2->id, 'campaign_id' => $campaign->id, 'is_dm' => true, 'is_owner' => false]);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $this->user->id, 'campaign_id' => $campaign->id, 'is_dm' => false, 'is_owner' => false]);
        $this->assertEquals($campaign->code, Campaign::first()->code);
    }
}
