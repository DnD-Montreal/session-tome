<?php

namespace Tests\Feature;

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

        //create request not passing params
        $response = $this->actingAs($this->user)->get(route('offer.create', $trade));

        $response->assertOk();
        $response->assertViewIs('offer.create');
    }

    /**
     * @test
     */
    public function store_attaches_offer_to_trade()
    {
        $item = Item::factory()->create([
            'rarity' => 'rare',
            'id' => 234,
            'description' => "listed"
        ]);

        $trade = Trade::factory()->create([
            'id' => 456,
            'item_id' => $item->id
        ]);
        //If item_id not explicitly set as in line 87, the item_id increments by 1
        //after during store request... below line not sufficient
        //$trade->item()->associate($item);

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

        $response = $this->from('/')->post(route('offer.store'), [
            'trade_id' => $trade->id,
            'item_id' => $offer->id
        ]);

        $response->assertRedirect('/');

        $response = $this->from('/')->post(route('offer.store'), [
            'trade_id' => $trade->id,
            'item_id' => $invalidOffer->id
        ]);

        $response->assertRedirect('/');

        $this->assertTrue($trade->offers()->get()->contains($offer));
        $this->assertFalse($trade->offers()->get()->contains($invalidOffer));

        //add redirect assertion if we change redirect to specific view
    }

    /**
     * @test
     */
    public function destroy_detaches_offer()
    {
        $offer = Item::factory()->create([
            'id' => 333,
            'description' => "test item"
        ]);
        $trade = Trade::factory()->create();
        $trade->offers()->attach($offer);

        $response = $this->from('/')->delete(route('offer.destroy', [$offer, $trade]));

        $response->assertRedirect('/');
        $this->assertNotContains($offer, $trade->offers);
    }
}
