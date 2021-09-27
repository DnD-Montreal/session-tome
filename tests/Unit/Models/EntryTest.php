<?php

namespace Tests\Unit\Models;

use App\Models\Entry;
use App\Models\Item;
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
}
