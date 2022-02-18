<?php

namespace Tests\Unit\Actions;

use App\Actions\FulfillTrade;
use App\Models\Entry;
use App\Models\Trade;
use App\Models\Item;
use App\Models\Character;
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
            "character_id" => $tradeCharacter->id,
            "item_id" => $tradeItem->id]);

        $offerItem = Item::factory()->create(['character_id' => $offerCharacter->id]);

        $trade->items()->attach($offerItem);

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
            ->where('notes', "Trade between ".$tradeCharacter->name." and ".$offerCharacter->name)
            ->get();

        $tradeCharacterEntries = $tradeCharacter->entries()
            ->where('notes', "Trade between ".$tradeCharacter->name." and ".$offerCharacter->name)
            ->get();

        $this->assertTrue($tradeCharacterEntries->count() > 0);
        $this->assertTrue($offerCharacterEntries->count() > 0);

        $this->assertNotContains($tradeItem->id, $tradeCharacter->items->pluck('id'));
        $this->assertContains($offerItem->id, $tradeCharacter->items->pluck('id'));

        $this->assertNotContains($offerItem->id, $offerCharacter->items->pluck('id'));
        $this->assertContains($tradeItem->id, $offerCharacter->items->pluck('id'));
    }
}
