<?php

namespace Tests\Unit\Models;

use App\Models\Adventure;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class EntryTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_have_items()
    {
        Item::factory(1)->create();
        $entry = Entry::has('items')->first();

        $this->assertCount(1, $entry->items()->get());
    }

    /**
     * @test
     */
    public function can_have_user()
    {
        $entry = Entry::factory(1)->create()[0];

        $this->assertCount(1, $entry->user()->get());
    }

    /**
     * @test
     */
    public function can_have_adventure()
    {
        $entry = Entry::factory(1)->create()[0];

        $this->assertCount(1, $entry->adventure()->get());
    }

    /**
     * @test
     */
    public function can_have_campaign()
    {
        $entry = Entry::factory(1)->create()[0];

        $this->assertCount(1, $entry->campaign()->get());
    }

    /**
     * @test
     */
    public function can_have_character()
    {
        $entry = Entry::factory(1)->create()[0];

        $this->assertCount(1, $entry->character()->get());
    }

    /**
     * @test
     */
    public function can_have_event()
    {
        $entry = Entry::factory(1)->create()[0];

        $this->assertCount(1, $entry->event()->get());
    }

    /**
     * @test
     */
    public function can_have_dungeon_master()
    {
        $entry = Entry::factory(1)->create()[0];

        $this->assertCount(1, $entry->dungeonMaster()->get());
    }

    /**
     * @test
     */
    public function counts_sessions_properly()
    {
        $user = User::factory()->create();
        $dm = User::factory()->create();
        $adventure = Adventure::factory()->create();
        $character = Character::factory()->create([
            'user_id' => $user->id
        ]);
        $date = now()->subDays(3);
        $data = [
            'adventure_id' => $adventure->id,
            'character_id' => $character->id,
            'dungeon_master_id' => $dm->id,
        ];

        $sessionThree = Entry::factory()->create(array_merge($data, ['date_played' => $date]));
        $sessionTwo = Entry::factory()->create(array_merge($data, ['date_played' => $date->addDay()]));
        $sessionOne = Entry::factory()->create(array_merge($data, ['date_played' => $date->addDays(2)]));

        $this->assertEquals(1, $sessionOne->session);
        $this->assertEquals(2, $sessionTwo->session);
        $this->assertEquals(3, $sessionThree->session);
    }
}
