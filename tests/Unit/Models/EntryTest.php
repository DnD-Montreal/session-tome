<?php

namespace Tests\Unit\Models;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\Rating;
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
    public function can_have_rating()
    {
        $entry = Entry::factory()->has(Rating::factory())->create();

        $this->assertCount(1, $entry->rating()->get());
    }

    /**
     * @test
     */
    public function can_distinguish_between_reward_types()
    {
        $character = Character::factory()->create();
        $defaults = [
            'character_id' => $character->id,
            'user_id' => $character->user->id,
            'type' => Entry::TYPE_DM,
            'levels' => 0
        ];
        $advancement = Entry::factory()->create(array_merge($defaults, ['levels' => 1]));
        $magicItem = Entry::factory()->create($defaults);
        Item::factory()->create([
            'character_id' => $character->id,
            'entry_id' => $magicItem->id,
            'author_id' => $character->user->id,
        ]);
        $campaign = Entry::factory()->create($defaults);

        $isAdvancement = $advancement->reward == Entry::REWARD_ADVANCEMENT;
        $isMagicItem = $magicItem->reward == Entry::REWARD_MAGIC_ITEM;
        $isCampaign = $campaign->reward == Entry::REWARD_CAMPAIGN;

        $this->assertTrue($isAdvancement);
        $this->assertTrue($isMagicItem);
        $this->assertTrue($isCampaign);
    }
}
