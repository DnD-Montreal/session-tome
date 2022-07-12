<?php

namespace Tests\Unit\Models;

use App\Models\Item;
use App\Models\Trade;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class ItemTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_belong_to_trades()
    {
        $trade = Trade::factory(1)->create();
        $item = Item::factory(1)->create()[0];

        $item->trades()->attach($trade);

        $this->assertCount(1, $item->trades()->get());
    }

    /**
     * @test
     */
    public function can_belong_to_entry()
    {
        $item = Item::factory(1)->create()[0];

        $this->assertCount(1, $item->entry()->get());
    }

    /**
     * @test
     */
    public function can_belong_to_character()
    {
        $item = Item::factory(1)->create()[0];

        $this->assertCount(1, $item->character()->get());
    }

    /**
     * @test
     */
    public function item_has_an_author()
    {
        $item = Item::factory()->create();
        $user = User::factory()->create();

        $item->author()->associate($user);
        $item->save();
        $item->refresh();
        $user->refresh();

        $this->assertEquals($user->id, $item->author->id);
    }

    /**
     * @test
     */
    public function can_be_listed_in_trade()
    {
        $item = Item::factory()->create([
            'description' => 'listed item',
        ]);
        $trade = Trade::factory()->create();

        $item->trade()->save($trade);

        $this->assertCount(1, $item->trade()->get());
        $this->assertEquals($trade->id, $item->trade->id);
    }
}
