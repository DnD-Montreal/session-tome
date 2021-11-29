<?php

namespace Http\Controllers;

use App\Http\Requests\AttachDMEntryRequest;
use App\Http\Controllers\DMEntryController;
use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\Assert;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

use function PHPUnit\Framework\assertEquals;

class DMEntryControllerTest extends TestCase
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
        $entry = Entry::factory(2)->create([
            'type' => Entry::TYPE_DM,
            'user_id' => $this->user->id
        ]);

        $response = $this->get(route('dm-entry.index'));

        $response->assertOk();
        $response->assertViewIs('entry.index');
        $response->assertViewHas('entries');

        $responseEntries = $response->viewData('entries');

        foreach ($responseEntries as $responseEntry) {
            $this->assertEquals(Entry::TYPE_DM, $responseEntry->type);
        }

        $this->assertTrue($responseEntries->count() >= 2);
    }

    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('dm-entry.create'));

        $response->assertInertia(
            fn (Assert $page) => $page
                ->component("Entry/Create/DmEntryCreate")
                ->has('adventures')
        );
    }

    /**
     * @test
     */
    public function storing_dm_entries_redirects()
    {
        $adventure = Adventure::factory()->create();
        $campaign = Campaign::factory()->create();
        $event = Event::factory()->create();
        $dungeon_master_user = User::factory()->create();
        $dungeon_master = $this->faker->word;
        $date_played = $this->faker->dateTime();
        $location = $this->faker->word;
        $type = Entry::TYPE_DM;
        $levels = $this->faker->numberBetween(1, 20);
        $gp = $this->faker->randomFloat(2, 0, 9999999.99);

        $response = $this->actingAs($this->user)->post(route('entry.store'), [
            'user_id' => $this->user->id,
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

        $entries = Entry::query()
            ->where('user_id', $this->user->id)
            ->where('adventure_id', $adventure->id)
            ->where('campaign_id', $campaign->id)
            ->where('event_id', $event->id)
            ->where('dungeon_master_id', $dungeon_master_user->id)
            ->where('dungeon_master', $dungeon_master)
            ->where('date_played', $date_played)
            ->where('location', $location)
            ->where('type', $type)
            ->get();

        $this->assertCount(1, $entries);
        $entry = $entries->first();

        $response->assertRedirect(route('dm-entry.index'));
        $response->assertSessionHas('entry.id', $entry->id);
    }


    /**
     * @test
     */
    public function dm_entries_get_attached_to_characters()
    {
        $dmEntry1 = Entry::factory()->create([
            'user_id' => $this->user->id,
            'type' => Entry::TYPE_DM,
            'character_id' => null,
            'levels' => 1,
        ]);
        $dmEntry2 = Entry::factory()->create([
            'user_id' => $this->user->id,
            'type' => Entry::TYPE_DM,
            'character_id' => null,
            'levels' => 2,
        ]);
        $dmEntry3 = Entry::factory()->create([
            'user_id' => $this->user->id,
            'type' => Entry::TYPE_DM,
            'character_id' => null,
            'levels' => 3,
        ]);
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
            'level' => 1,
        ]);


        $response = $this->actingAs($this->user)->put(route('attach-entry-to-character.update', $character), [
            'dm_entry_ids' => [$dmEntry1->id, $dmEntry2->id],
        ]);

        $character->refresh();
        $dmEntry1->refresh();
        $dmEntry2->refresh();

        $this->assertEquals($dmEntry1->character_id, $character->id);
        $this->assertEquals($dmEntry2->character_id, $character->id);
        $this->assertNotEquals($dmEntry3->character_id, $character->id);
        $this->assertEquals($character->level, 4);

        $response = $this->actingAs($this->user)->put(route('attach-entry-to-character.update', $character), [
            'dm_entry_ids' => [$dmEntry3->id],
        ]);

        $character->refresh();
        $dmEntry3->refresh();

        $this->assertEquals($character->level, 7);

        $response->assertRedirect(route('dm-entry.index'));
    }

    /**
     * @test
     */
    public function attach_dm_entry_request_rules_check_uniqueness()
    {
        $dmEntry1 = Entry::factory()->create([
            'user_id' => $this->user->id,
            'type' => Entry::TYPE_DM,
            'character_id' => null,
            'levels' => 1,
        ]);
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
            'level' => 1,
        ]);


        // Entry ids are not unique.
        $response = $this->actingAs($this->user)->put(route('attach-entry-to-character.update', $character), [
            'dm_entry_ids' => [$dmEntry1->id, $dmEntry1->id],
        ]);
        $response->assertStatus(302);
    }

    /**
     * @test
     */
    public function attach_dm_entry_request_rules_check_existence()
    {
        $dmEntry1 = Entry::factory()->create([
            'user_id' => $this->user->id,
            'type' => Entry::TYPE_DM,
            'character_id' => null,
            'levels' => 1,
        ]);
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
            'level' => 1,
        ]);


        // Entry id does not exist.
        $response = $this->actingAs($this->user)->put(route('attach-entry-to-character.update', $character), [
            'dm_entry_ids' => [$dmEntry1->id, $this->faker->numberBetween(10, 20)],
        ]);
        $response->assertStatus(302);

        // Entry id is not an integer.
        $response = $this->actingAs($this->user)->put(route('attach-entry-to-character.update', $character), [
            'dm_entry_ids' => [$dmEntry1->id, $this->faker->word()],
        ]);
        $response->assertStatus(302);
    }

    /**
     * @test
     */
    public function attach_dm_entry_request_rules_check_integer_array()
    {
        $dmEntry1 = Entry::factory()->create([
            'user_id' => $this->user->id,
            'type' => Entry::TYPE_DM,
            'character_id' => null,
            'levels' => 1,
        ]);
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
            'level' => 1,
        ]);

        // Entry id is not an integer.
        $response = $this->actingAs($this->user)->put(route('attach-entry-to-character.update', $character), [
            'dm_entry_ids' => [$dmEntry1->id, $this->faker->word()],
        ]);
        $response->assertStatus(302);
    }
}
