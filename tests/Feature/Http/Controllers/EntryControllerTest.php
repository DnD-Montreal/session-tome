<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\EntryController
 */
class EntryControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function index_displays_view()
    {
        $entries = Entry::factory()->count(3)->create();

        $response = $this->get(route('entry.index'));

        $response->assertOk();
        $response->assertViewIs('entry.index');
        $response->assertViewHas('entries');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('entry.create'));

        $response->assertOk();
        $response->assertViewIs('entry.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\EntryController::class,
            'store',
            \App\Http\Requests\EntryStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $user = User::factory()->create();
        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $character = Character::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = $this->faker->word;
        $levels = $this->faker->numberBetween(1, 20);
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);

        $response = $this->post(route('entry.store'), [
            'user_id' => $user->id,
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'character_id' => $character->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'levels' => $levels,
            'gp' => $gp,
        ]);

        $entries = Entry::query()
            ->where('user_id', $user->id)
            ->where('adventure_id', $adventure->id)
            ->where('campaign_id', $campaign->id)
            ->where('character_id', $character->id)
            ->where('event_id', $event->id)
            ->where('dungeon_master_id', $dungeon_master_user->id)
            ->where('dungeon_master', $dungeon_master)
            ->where('date_played', $date_played)
            ->where('location', $location)
            ->where('type', $type)
            ->where('levels', $levels)
            ->where('gp', $gp)
            ->get();
        $this->assertCount(1, $entries);
        $entry = $entries->first();

        $response->assertRedirect(route('entry.index'));
        $response->assertSessionHas('entry.id', $entry->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $entry = Entry::factory()->create();

        $response = $this->get(route('entry.show', $entry));

        $response->assertOk();
        $response->assertViewIs('entry.show');
        $response->assertViewHas('entry');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $entry = Entry::factory()->create();

        $response = $this->get(route('entry.edit', $entry));

        $response->assertOk();
        $response->assertViewIs('entry.edit');
        $response->assertViewHas('entry');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\EntryController::class,
            'update',
            \App\Http\Requests\EntryUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $entry = Entry::factory()->create();
        $user = User::factory()->create();
        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $character = Character::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = $this->faker->word;
        $levels = $this->faker->numberBetween(1, 20);
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);

        $response = $this->put(route('entry.update', $entry), [
            'user_id' => $user->id,
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'character_id' => $character->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'levels' => $levels,
            'gp' => $gp,
        ]);

        $entry->refresh();

        $response->assertRedirect(route('entry.index'));
        $response->assertSessionHas('entry.id', $entry->id);

        $this->assertEquals($user->id, $entry->user_id);
        $this->assertEquals($adventure->id, $entry->adventure_id);
        $this->assertEquals($campaign->id, $entry->campaign_id);
        $this->assertEquals($character->id, $entry->character_id);
        $this->assertEquals($event->id, $entry->event_id);
        $this->assertEquals($dungeon_master_user->id, $entry->dungeon_master_id);
        $this->assertEquals($dungeon_master, $entry->dungeon_master);
        $this->assertEquals($date_played, $entry->date_played);
        $this->assertEquals($location, $entry->location);
        $this->assertEquals($type, $entry->type);
        $this->assertEquals($levels, $entry->levels);
        $this->assertEquals($gp, $entry->gp);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $entry = Entry::factory()->create();

        $response = $this->delete(route('entry.destroy', $entry));

        $response->assertRedirect(route('entry.index'));

        $this->assertDeleted($entry);
    }
}
