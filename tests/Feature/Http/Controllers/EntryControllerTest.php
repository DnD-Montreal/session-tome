<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\Item;
use App\Models\Rating;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\Assert;
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
        $entries = Entry::factory()->count(3)->create();

        $response = $this->get(route('entry.index'));

        $response->assertOk();
        $response->assertViewIs('entry.index');
        $response->assertViewHas('entries');
    }

    /**
     * @test
     */
    public function index_scopes_to_user()
    {
        $entries = Entry::factory()->count(2)->create();
        $entry3 = Entry::factory()->create(); //for user2, should not appear in index for user1
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $entries[0]->user()->associate($user1)->save();
        $entries[1]->user()->associate($user1)->save();
        $entry3->user()->associate($user2)->save();

        $response = $this->get(route('entry.index') . "?user_id={$user1->id}");

        $response->assertOk();
        $response->assertViewIs('entry.index');
        $response->assertViewHas('entries');

        $response->assertViewHas('entries', function ($entries) use ($user1) {
            $result = true;
            foreach ($entries->pluck('user_id') as $uid) {
                $result = $result && $uid = $user1->id;
            }
            return $result;
        });
    }

    /**
     * @test
     */
    public function update_redirects_to_dm_entry_index()
    {
        $dm_entry = Entry::factory()->create([
            'type' => Entry::TYPE_DM,
            'character_id' => null,
        ]);
        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);
        $choice = 'advancement';

        $dm_entry->user()->associate($dungeon_master_user)->save();

        $response = $this->actingAs($dungeon_master_user)->put(route('entry.update', $dm_entry), [
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'gp' => $gp,
            'type' => Entry::TYPE_DM,
            'choice' => $choice
        ]);

        $response->assertRedirect(route('dm-entry.index'));
    }

    /**
     * @test
     */
    public function create_displays_view()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $response = $this->get(route('entry.create', ['character_id' => $character->id]));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Character/Detail/Entry/Create/EntryCreate')
                ->has('character')
        );
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

        $response = $this->actingAs($user)->post(route('entry.store'), [
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

        $response->assertForbidden();

        $character->user()->associate($this->user)->save();

        $response = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
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
            ->where('user_id', $this->user->id)
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

        $response->assertRedirect(route('character.show', $character->id));
        $response->assertSessionHas('entry.id', $entry->id);
    }

    /**
     * @test
     */
    public function store_saves_entry_with_items()
    {
        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $character = Character::factory()->create(['user_id' => $this->user->id]);
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = $this->faker->word;
        $levels = $this->faker->numberBetween(1, 20);
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);
        $itemData = [
            ['name' => "Longsword +1", 'rarity' => "uncommon"],
            ['name' => "Amulet of Health", 'rarity' => "rare", 'description' => "Your Constitution score is 19 while you wear this amulet."]
        ];


        $response = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
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
            'items' => $itemData,
        ]);

        $entry = Entry::query()
            ->where('user_id', $this->user->id)
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
            ->first();

        $response->assertRedirect(route('character.show', $character->id));
        $this->assertDatabaseHas('items', $itemData[0]);
        $this->assertDatabaseHas('items', $itemData[1]);
        $this->assertCount(2, $entry->items);
    }

    /**
     * @test
     */
    public function store_handles_dm_reward_choice()
    {
        // Set Default Values for All Required Attributes of Entry
        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $character_adv = Character::factory()->create(['user_id' => $this->user->id]);
        $character_MI = Character::factory()->create(['user_id' => $this->user->id]);
        $character_CR = Character::factory()->create(['user_id' => $this->user->id]);
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = Entry::TYPE_DM;
        $levels = $this->faker->numberBetween(1, 20);
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);
        $itemData = [
            ['name' => "Longsword +1", 'rarity' => "uncommon"],
            ['name' => "Amulet of Health", 'rarity' => "rare", 'description' => "Your Constitution score is 19 while you wear this amulet."]
        ];
        $choice_advancement = 'advancement';
        $choice_item = 'magic_item';
        $choice_rewards = 'campaign_reward';

        //post request entry.store for each of them
        $response_advancement = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'character_id' => $character_adv->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'levels' => $levels,
            'gp' => $gp,
            'choice' => $choice_advancement,

        ]);

        $response_MI = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'character_id' => $character_MI->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'levels' => $levels,
            'gp' => $gp,
            'items' => $itemData,
            'choice' => $choice_item,

        ]);

        $response_CR = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'character_id' => $character_CR->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'levels' => $levels,
            'gp' => $gp,
            'choice' => $choice_rewards,

        ]);

        //Create the DM Entry for each of the above requests
        $advancement_entry = Entry::query()
            ->where('character_id', $character_adv->id)
            ->first();

        $magic_item_entry = Entry::query()
            ->where('character_id', $character_MI->id)
            ->first();

        $campaign_reward_entry = Entry::query()
            ->where('character_id', $character_CR->id)
            ->first();

        //advancement assertions
        $this->assertEquals(1, $advancement_entry->levels);
        $this->assertCount(0, $advancement_entry->items);

        //reward_item assertions
        $this->assertEquals(0, $magic_item_entry->levels);
        $this->assertCount(1, $magic_item_entry->items);

        //campaign_reward assertions
        $this->assertEquals(0, $campaign_reward_entry->levels);
        $this->assertCount(0, $campaign_reward_entry->items);
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

        $response = $this->actingAs($this->user)->put(route('entry.update', $entry), [
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

        $response->assertForbidden();

        $character->user()->associate($this->user)->save();
        $entry->user()->associate($this->user)->save();
        $entry->character()->associate($character)->save();

        $response = $this->actingAs($this->user)->put(route('entry.update', $entry), [
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'levels' => $levels,
            'gp' => $gp,
        ]);

        $response->assertForbidden();

        $response = $this->actingAs($this->user)->put(route('entry.update', $entry), [
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
    public function store_dm_entry_on_character_updates_level()
    {
        $character = Character::factory()->create([
            'level' => 1,
        ]);

        $character->user()->associate($this->user)->save();

        $oldLevel = $character->level;

        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = Entry::TYPE_DM;
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);

        $response = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'character_id' => $character->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'gp' => $gp,
            'choice' => 'advancement',
        ]);

        $character->refresh();
        $this->assertEquals($oldLevel + 1, $character->level);
    }

    /**
     * @test
     */
    public function update_dm_entry_on_character_updates_level()
    {
        $character = Character::factory()->create([
            'level' => 0,
        ]);

        $entry = Entry::factory()->create([
            'type' => Entry::TYPE_DM,
        ]);

        $character->user()->associate($this->user)->save();
        $entry->character()->associate($character)->save();

        $oldLevel = $character->level;

        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = Entry::TYPE_DM;
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);

        $response = $this->actingAs($this->user)->put(route('entry.update', $entry), [
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'gp' => $gp,
            'choice' => 'advancement',
        ]);

        $character->refresh();

        $this->assertEquals(1, $character->level);
    }

    /**
     * @test
     */
    public function update_entry_with_character_updates_level()
    {
        $character = Character::factory()->create([
            'level' => 1,
            ]);

        $entry = Entry::factory()->create([
            'character_id' => null,
            'type' => Entry::TYPE_DM,
            'levels' => 3,
        ]);

        $character->user()->associate($this->user)->save();
        $entry->character()->associate($character)->save();


        $oldLevel = $character->level;

        $character->refresh();

        $this->assertEquals($entry->level + $oldLevel, $character->level);
    }

    /**
     * @test
     */
    public function update_campaign_reward_clears_items_and_levels()
    {
        $items = Item::factory()->count(2)->create();

        $character = Character::factory()->create([
            'level' => 0,
        ]);

        $entry = Entry::factory()->create([
            'type' => Entry::TYPE_DM,
            'levels' => 5,
        ]);

        $character->user()->associate($this->user)->save();
        $entry->character()->associate($character)->save();
        $entry->items()->saveMany($items);
        $entry->save();

        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = Entry::TYPE_DM;
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);

        $response = $this->actingAs($this->user)->put(route('entry.update', $entry), [
            'adventure_id' => $adventure->id,
            'campaign_id' => $campaign->id,
            'event_id' => $event->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'location' => $location,
            'type' => $type,
            'gp' => $gp,
            'choice' => 'campaign_reward',
        ]);

        $character->refresh();

        $this->assertEquals(0, $character->levels);
        $this->assertCount(0, $entry->items);
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

    /**
     * @test
     */
    public function store_creates_rating()
    {
        $adventure = Adventure::factory()->create();
        $character = Character::factory()->create(['user_id' => $this->user->id]);
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $type = $this->faker->word;


        $ratingData = [
            "creative" => true,
            "flexible" => false,
            "friendly" => true,
            "helpful" => false,
            "prepared" => true
        ];



        $response = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
            'adventure_id' => $adventure->id,
            'character_id' => $character->id,
            'dungeon_master_id' => $dungeon_master_user->id,
            'dungeon_master' => $dungeon_master,
            'date_played' => $date_played,
            'type' => $type,
            'rating_data' => [
                "creative" => true,
                "flexible" => false,
                "friendly" => true,
                "helpful" => false,
                "prepared" => true
            ]
        ]);

        $entry = Entry::first();
        $rating = Rating::first();

        $this->assertCount(1, Rating::all());
        $this->assertEquals(21, $rating->categories);
    }

    /**
     * @test
     */
    public function update_creates_rating()
    {
        $entry = Entry::factory()->create();
        $character = Character::factory()->create();

        $this->assertCount(0, Rating::all());

        $character->user()->associate($this->user)->save();
        $entry->user()->associate($this->user)->save();
        $entry->character()->associate($character)->save();

        $response = $this->actingAs($this->user)->put(route('entry.update', $entry), [
            'adventure_id' => $entry->adventure_id,
            'character_id' => $character->id,
            'date_played' => $entry->date_played,
            'type' => $entry->type,
            'rating_data' => [
                "creative" => true,
                "flexible" => false,
                "friendly" => true,
                "helpful" => false,
                "prepared" => true
            ]
        ]);

        $rating = Rating::first();

        $response->assertRedirect();
        $this->assertCount(1, Rating::all());
        $this->assertEquals(21, $rating->categories);
    }
}
