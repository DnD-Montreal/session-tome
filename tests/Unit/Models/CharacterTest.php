<?php

namespace Tests\Unit\Models;

use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\Session;
use App\Models\Trade;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class CharacterTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_belong_to_sessions()
    {
        $session = Session::factory(1)->create();
        $character = Character::factory(1)->create()[0];

        $character->sessions()->attach($session);

        $this->assertCount(1, $character->sessions()->get());
    }

    /**
     * @test
     */
    public function can_belong_to_campaigns()
    {
        $campaign = Campaign::factory(1)->create();
        $character = Character::factory(1)->create()[0];

        $character->campaigns()->attach($campaign);

        $this->assertCount(1, $character->campaigns()->get());
    }

    /**
     * @test
     */
    public function can_have_items()
    {
        Item::factory(1)->create();
        $character = Character::has('items')->first();

        $this->assertCount(1, $character->items()->get());
    }

    /**
     * @test
     */
    public function can_have_trades()
    {
        Trade::factory(1)->create();
        $character = Character::has('trades')->first();

        $this->assertCount(1, $character->trades()->get());
    }

    /**
     * @test
     */
    public function can_have_entries()
    {
        Entry::factory(1)->create();

        $entries = Character::first()->entries()->get();

        $this->assertCount(1, $entries);
    }

    /**
     * @test
     */
    public function can_access_gp()
    {
        $character = Character::factory()->create();

        $this->assertEquals(0, $character->gp);

        $goldEntry = Entry::factory(3)->create([
            'gp' => 1000,
            'character_id' => $character->id,
        ]);

        $this->assertEquals(3*1000, $character->gp);
    }
}
