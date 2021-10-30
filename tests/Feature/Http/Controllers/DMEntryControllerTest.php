<?php

namespace Http\Controllers;

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
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

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
}
