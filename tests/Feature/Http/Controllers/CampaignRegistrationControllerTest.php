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
                ->component("Campaign/Detail/CampaignDetail")
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
        $this->assertDatabaseHas('campaign_user', ['user_id' =>$this->user->id, 'campaign_id' =>$campaign->id, 'is_dm' => false, 'is_owner' =>false]);
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
        $this->assertDatabaseHas('campaign_user', ['user_id' =>$this->user->id, 'campaign_id' =>$campaign->id, 'is_dm' =>true, 'is_owner' =>false]);
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
}
