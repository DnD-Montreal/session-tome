<?php

namespace Tests\Unit\Actions;

use App\Actions\FulfillTrade;
use App\Exceptions\TradeClosedException;
use App\Exceptions\TradeNotAllowedException;
use App\Models\Character;
use App\Models\Item;
use App\Models\Trade;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class FulfillTradeTest extends TestCase
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
    public function trade_fulfillment_swaps_items()
    {
        $offerUser = User::factory()->create();

        $tradeCharacter = Character::factory()->create(['user_id' => $this->user->id]);
        $offerCharacter = Character::factory()->create(['user_id' => $offerUser->id]);

        $tradeItem = Item::factory()->create(['character_id' => $tradeCharacter->id]);
        $trade = Trade::factory()->create([
            'character_id' => $tradeCharacter->id,
            'item_id' => $tradeItem->id,
            'status' => Trade::STATUS_OPEN,
        ]);

        $offerItem = Item::factory()->create(['character_id' => $offerCharacter->id]);

        $trade->offers()->attach($offerItem);

        $this->assertContains($tradeItem->id, $tradeCharacter->items->pluck('id'));
        $this->assertNotContains($offerItem->id, $tradeCharacter->items->pluck('id'));

        $this->assertContains($offerItem->id, $offerCharacter->items->pluck('id'));
        $this->assertNotContains($tradeItem->id, $offerCharacter->items->pluck('id'));

        FulfillTrade::run($trade, $offerItem);

        $tradeCharacter->refresh();
        $tradeItem->refresh();
        $offerCharacter->refresh();
        $offerItem->refresh();

        $offerCharacterEntries = $offerCharacter->entries()
            ->where('notes', 'Trade between '.$tradeCharacter->name.' and '.$offerCharacter->name)
            ->where('downtime', -5)
            ->get();

        $tradeCharacterEntries = $tradeCharacter->entries()
            ->where('notes', 'Trade between '.$tradeCharacter->name.' and '.$offerCharacter->name)
            ->where('downtime', -5)
            ->get();

        $this->assertTrue($tradeCharacterEntries->count() > 0);
        $this->assertTrue($offerCharacterEntries->count() > 0);

        $this->assertEquals(Trade::STATUS_CLOSED, $trade->status);

        $this->assertCount(0, $trade->offers);

        $this->assertNotContains($tradeItem->id, $tradeCharacter->items->pluck('id'));
        $this->assertContains($offerItem->id, $tradeCharacter->items->pluck('id'));

        $this->assertNotContains($offerItem->id, $offerCharacter->items->pluck('id'));
        $this->assertContains($tradeItem->id, $offerCharacter->items->pluck('id'));
    }

    /**
     * @test
     */
    public function trade_fulfillment_on_closed_throws_exception()
    {
        $offerUser = User::factory()->create();

        $tradeCharacter = Character::factory()->create(['user_id' => $this->user->id]);
        $offerCharacter = Character::factory()->create(['user_id' => $offerUser->id]);

        $tradeItem = Item::factory()->create(['character_id' => $tradeCharacter->id]);
        $trade = Trade::factory()->create([
            'character_id' => $tradeCharacter->id,
            'item_id' => $tradeItem->id, ]);

        $offerItem = Item::factory()->create(['character_id' => $offerCharacter->id]);

        $trade->offers()->attach($offerItem);

        $trade->status = Trade::STATUS_CLOSED;

        $this->expectException(TradeClosedException::class);

        FulfillTrade::run($trade, $offerItem);
    }

    /**
     * @test
     */
    public function trade_fulfillment_unauthorized_throws_exception()
    {
        $offerUser = User::factory()->create();

        $wrongUser = User::factory()->create();

        $tradeCharacter = Character::factory()->create(['user_id' => $wrongUser->id]);
        $offerCharacter = Character::factory()->create(['user_id' => $offerUser->id]);

        $tradeItem = Item::factory()->create(['character_id' => $tradeCharacter->id]);
        $trade = Trade::factory()->create([
            'character_id' => $tradeCharacter->id,
            'item_id' => $tradeItem->id,
            'status' => Trade::STATUS_OPEN, ]);

        $offerItem = Item::factory()->create(['character_id' => $offerCharacter->id]);

        $trade->offers()->attach($offerItem);

        $this->expectException(TradeNotAllowedException::class);

        FulfillTrade::run($trade, $offerItem);
    }
}
