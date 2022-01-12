<?php

namespace Tests\Unit\Observers;

use App\Models\Character;
use App\Models\Entry;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class CharacterObserverTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_deleted_characters_items_remain_after_deletion()
    {
        $character = Character::factory()->has(Entry::factory(3))->create();

        $character->delete();

        $this->assertDatabaseCount(Entry::class, 3);
        Entry::all()->each(function ($entry) {
            $this->assertNull($entry->character_id);
        });
    }
}
