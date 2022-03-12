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

class TradeOfferControllerTest extends TestCase
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
    public function create_displays_view()
    {
        $trade = Trade::factory()->create();
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $items = Item::factory()->count(2)->create([
            'character_id' => $character->id
        ]);
        $character->items()->saveMany($items);

        $response = $this->actingAs($this->user)->get(route('offer.create', $trade));

        $response->assertOk();
        $response->assertViewIs('offer.create');
        $response->assertViewHas('validItems');
        $response->assertViewHas('trade');
    }

    /**
     * @test
     */
    public function store_attaches_offer_to_trade()
    {
        $item = Item::factory()->create([
            'rarity' => 'rare',
            'description' => "listed"
        ]);

        $trade = Trade::factory()->create();
        $trade->item()->associate($item)->save();

        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);

        $offer = Item::factory()->create([
            'character_id' => $character->id,
            'rarity' => $item->rarity,
            'description' => "offered"
        ]);
        $invalidOffer = Item::factory()->create([
            'rarity' => 'common'
        ]);

        $response = $this->post(route('offer.store'), [
            'trade_id' => $trade->id,
            'item_id' => $offer->id
        ]);

        $response->assertRedirect();

        $responseInvalid = $this->post(route('offer.store'), [
            'trade_id' => $trade->id,
            'item_id' => $invalidOffer->id
        ]);

        $responseInvalid->assertRedirect();
        $responseInvalid->assertSessionHasErrors();

        $this->assertTrue($trade->offers()->get()->contains($offer));
        $this->assertFalse($trade->offers()->get()->contains($invalidOffer));

        //add redirect assertion if we change redirect to specific view
    }

    /**
     * @test
     */
    public function destroy_detaches_offer()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $offer = Item::factory()->create([
            'character_id' => $character->id,
        ]);
        $trade = Trade::factory()->create();
        $trade->offers()->attach($offer);

        $invalid_user = User::factory()->create();

        $response_invalid = $this->actingAs($invalid_user)->delete(route('offer.destroy', [$offer, $trade]));

        $response_invalid->assertRedirect();
        $response_invalid->assertSessionHasErrors();

        $response = $this->actingAs($this->user)->delete(route('offer.destroy', [$offer, $trade]));

        $response->assertRedirect();
        $this->assertNotContains($offer, $trade->offers);
    }
}
