<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\Character;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\AssertableInertia;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class BulkEntryControllerTest extends TestCase
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
    public function entries_can_be_created_in_bulk()
    {
        $characters = Character::factory(3)->create();
        $adventure = Adventure::factory()->create();
        // Three month difference
        $startDate = "01-01-2022";
        $endDate = "02-04-2022";
        $freqWeekly = 1;
        $freqBiweekly = 0.5;
        $freqTwiceWeekly = 2;

        $responseWeekly = $this->actingAs($characters[0]->user)
            ->post(route('entry-bulk.store'), [
                'character_id' => $characters[0]->id,
                'adventure' => ['id' => $adventure->id],
                'start_date' => $startDate,
                'end_date' => $endDate,
                'frequency' => $freqWeekly,
            ]);

        $responseBiweekly = $this->actingAs($characters[1]->user)
            ->post(route('entry-bulk.store'), [
                'character_id' => $characters[1]->id,
                'adventure' => ['id' => $adventure->id],
                'start_date' => $startDate,
                'end_date' => $endDate,
                'frequency' => $freqBiweekly,
            ]);

        $responseTwiceWeekly = $this->actingAs($characters[2]->user)
            ->post(route('entry-bulk.store'), [
                'character_id' => $characters[2]->id,
                'adventure' => ['id' => $adventure->id],
                'start_date' => $startDate,
                'end_date' => $endDate,
                'frequency' => $freqTwiceWeekly,
            ]);


        // Weekly
        $entries = $characters[0]->entries;
        $responseWeekly->assertRedirect(route('character.show', [
            'character' => $characters[0]->refresh()
        ]));

        // 14 saturdays between Jan 1st and April 2nd (inclusive)
        $this->assertCount(14, $entries);
        $this->assertEquals(Carbon::parse('01-01-2022'), $entries[0]->date_played);
        $this->assertEquals(Carbon::parse('02-04-2022'), $entries->last()->date_played);


        // BiWeekly
        $entries = $characters[1]->entries;
        $responseBiweekly->assertRedirect(route('character.show', [
            'character' => $characters[1]->refresh()
        ]));

        // 14 saturdays in range, cut in half (played every other week), 7 entries
        $this->assertCount(7, $entries);
        $this->assertEquals(Carbon::parse('01-01-2022'), $entries[0]->date_played);
        $this->assertEquals(Carbon::parse('26-03-2022'), $entries->last()->date_played);


        // Twice per Week
        $entries = $characters[2]->entries;
        $responseTwiceWeekly->assertRedirect(route('character.show', [
            'character' => $characters[2]->refresh()
        ]));

        // This doesnt actually get used in our system, currently.
        $this->assertCount(31, $entries);
        $this->assertEquals(Carbon::parse('01-01-2022'), $entries[0]->date_played);
        $this->assertEquals(Carbon::parse('01-04-2022'), $entries->last()->date_played);
    }

    /**
     * @test
     */
    public function create_displays_view()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $response = $this->get(route('entry-bulk.create', ['character_id' => $character->id]));

        $response->assertOk();

        $response->assertInertia(
            fn (AssertableInertia $page) => $page
                ->component('Character/Detail/Entry/Create/BulkEntryCreate')
                ->has('character')
                ->has('adventures')
        );
    }
}
