<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\Item;
use App\Models\Trade;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;
use Inertia\Testing\Assert;

/**
 * @see \App\Http\Controllers\TradeController
 */
class TradeFulfillmentControllerTest extends TestCase
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
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\TradeController::class,
            'update',
            \App\Http\Requests\TradeUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $offerUser = User::factory()->create();


        $tradeCharacter = Character::factory()->create(['user_id' => $this->user->id]);
        $offerCharacter = Character::factory()->create(['user_id' => $offerUser->id]);

        $tradeItem = Item::factory()->create(['character_id' => $tradeCharacter->id]);
        $trade = Trade::factory()->create([
            "character_id" => $tradeCharacter->id,
            "item_id" => $tradeItem->id,
            "status" => Trade::STATUS_OPEN,
        ]);

        $offerItem = Item::factory()->create(['character_id' => $offerCharacter->id]);

        $trade->offers()->attach($offerItem);

        $response = $this->post(route('trade-fulfillment.store', $trade), [
            'character_id' => $tradeCharacter->id,
            'offered_item_id' => $offerItem->id,
        ]);

        //dd($response);

        $response->assertRedirect();
    }
}
