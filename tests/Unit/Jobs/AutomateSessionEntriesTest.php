<?php

namespace Tests\Unit\Jobs;

use App\Jobs\AutomateSessionEntries;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Session;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class AutomateSessionEntriesTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Auth::login($this->user);
    }

    /**
     * @test
     */
    public function session_job_creates_character_entries()
    {
        $characters = Character::factory()->count(3)->create();
        $dungeon_master = User::factory()->create();
        $session = Session::factory()->create([
            'start_time' => Carbon::now(),
            'dungeon_master_id' => $dungeon_master->id,
        ]);
        $session->characters()->attach($characters);

        $job = new AutomateSessionEntries();
        $job->handle();

        $character_ids = $characters->pluck('id');
        $character_entries = Entry::whereIn('character_id', $character_ids)
            ->where([
                'dungeon_master_id' => $dungeon_master->id,
                'date_played' => $session->start_time,
                'type' => Entry::TYPE_GAME,
                'event_id' => $session->event_id,
            ])->get();

        $dm_entry = Entry::where([
            'user_id' => $dungeon_master->id,
            'date_played' => $session->start_time,
            'type' => Entry::TYPE_DM,
            'event_id' => $session->event_id,
        ])->get();

        //assert Game Entries exist for all characters in $characters
        $this->assertEquals(3, $character_entries->count());
        //assert DM Entry exists for $dungeon_master
        $this->assertEquals(1, $dm_entry->count());
    }
}
