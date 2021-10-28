<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\Character;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class BulkEntryControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function entries_can_be_created_in_bulk()
    {
        $character = Character::factory()->create();
        $adventure = Adventure::factory()->create();
        // Three month difference
        $startDate = "01-01-2021";
        $endDate = "01-04-2021";
        $freq = 1;

        $response = $this->actingAs($character->user)
            ->post(route('entry-bulk.store'), [
                'character_id' => $character->id,
                'adventure_id' => $adventure->id,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'frequency' => $freq,
            ]);

        $entries = $character->entries;
        $response->assertRedirect(route('character.show', [
            'character' => $character->refresh()
        ]));
        // 3 months at 1(freq) game per week, 12 entries
        $this->assertCount(12, $entries);
        $this->assertEquals(Carbon::parse('01-01-2021'), $entries[0]->date_played);
        $this->assertEquals(Carbon::parse('01-04-2021'), $entries->last()->date_played);
    }
}
