<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\Assert;
use JMac\Testing\Traits\AdditionalAssertions;
use Symfony\Component\EventDispatcher\DependencyInjection\AddEventAliasesPass;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\CampaignController
 */
class CampaignControllerTest extends TestCase
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
    public function index_displays_view()
    {
        $campaigns = Campaign::factory()
            ->count(3)
            ->create();

        $response = $this->get(route('campaign.index'));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page->component('Campaign/Campaign')->has('campaigns')
        );
    }

    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('campaign.create'));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page->component('Campaign/Create/CampaignCreate')
        );
    }

    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\CampaignController::class,
            'store',
            \App\Http\Requests\CampaignStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $adventure = Adventure::factory()->create();
        $title = $this->faker->sentence(4);

        $response = $this->post(route('campaign.store'), [
            'adventure' => ['id' => $adventure->id],
            'title' => $title,
        ]);

        $campaigns = Campaign::query()
            ->where('adventure_id', $adventure->id)
            ->where('title', $title)
            ->get();
        $this->assertCount(1, $campaigns);
        $campaign = $campaigns->first();

        $response->assertRedirect(route('campaign.index'));
        $response->assertSessionHas('campaign.id', $campaign->id);
        $this->assertDatabaseCount('campaign_user', 1);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $this->user->id, 'campaign_id' => $campaign->id, 'is_dm' => true, 'is_owner' => true]);
    }

    /**
     * @test
     */
    public function store_saves_campaign_and_redirects()
    {
        $adventure = Adventure::factory()->create();
        $title = $this->faker->sentence(4);
        $character = Character::factory()->create();

        $response = $this->post(route('campaign.store'), [
            'adventure' => ['id' => $adventure->id],
            'title' => $title,
            'character_id' => $character->id,
        ]);

        $campaigns = Campaign::query()
            ->where('adventure_id', $adventure->id)
            ->where('title', $title)
            ->get();
        $this->assertCount(1, $campaigns);
        $campaign = $campaigns->first();

        $response->assertRedirect(route('campaign.index'));
        $response->assertSessionHas('campaign.id', $campaign->id);
        $this->assertDatabaseCount('campaign_user', 1);
        $this->assertDatabaseCount('campaign_character', 1);
        $this->assertDatabaseHas('campaign_user', ['user_id' => $this->user->id, 'campaign_id' => $campaign->id, 'is_dm' => false, 'is_owner' => true]);
        $this->assertDatabaseHas('campaign_character', ['character_id' => $character->id, 'campaign_id' =>$campaign->id]);
    }

    /**
     * @test
     */
    public function show_displays_view()
    {
        $adventure = Adventure::factory()->create();
        $entries = Entry::factory(3)->state([
            'user_id' => $this->user->id,
            'adventure_id' => $adventure->id
        ]);
        $character = Character::factory()
            ->has($entries)
            ->state([
                'user_id' => $this->user->id
            ]);
        $campaign = Campaign::factory()->has($character)->create([
            'adventure_id' => $adventure->id
        ]);
        $campaign->entries()->saveMany(Entry::all());


        $response = $this->get(route('campaign.show', $campaign));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Campaign/Detail/CampaignDetail')
                ->has('campaign')
                ->has('userCharacter')
        );
    }

    /**
     * @test
     */
    public function edit_displays_view()
    {
        $campaign = Campaign::factory()->create();

        $response = $this->get(route('campaign.edit', $campaign));

        $response->assertOk();
        $response->assertViewIs('campaign.edit');
        $response->assertViewHas('campaign');
    }

    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\CampaignController::class,
            'update',
            \App\Http\Requests\CampaignUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $campaign = Campaign::factory()->create();
        $adventure = Adventure::factory()->create();
        $title = $this->faker->sentence(4);
        $newCharacter = Character::factory()->create([
           'user_id' => $this->user->id
        ]);

        $response = $this->put(route('campaign.update', $campaign), [
            'adventure_id' => $adventure->id,
            'character_id' => $newCharacter->id,
            'title' => $title,
        ]);

        $campaign->refresh();

        $response->assertRedirect();
        $response->assertSessionHas('campaign.id', $campaign->id);

        $this->assertEquals($adventure->id, $campaign->adventure_id);
        $this->assertEquals($title, $campaign->title);
        $this->assertContains($newCharacter->id, $campaign->characters->pluck('id'));
    }

    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $campaign = Campaign::factory()->create();

        $campaign->users()->attach($this->user->id, ['is_owner' => true]);

        $response = $this->delete(route('campaign.destroy', $campaign));

        $response->assertRedirect(route('campaign.index'));
        $this->assertDeleted($campaign);
    }

    /**
     * @test
     */
    public function destroy_prevents_unauthorized_deletes()
    {
        $campaign = Campaign::factory()->create();

        $response = $this->delete(route('campaign.destroy', $campaign));

        $response->assertRedirect();
        $response->assertSessionHasErrors();
        $this->assertModelExists($campaign);
    }
}
