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
    public function edit_displays_offer_view()
    {
        $trade = Trade::factory()->create([
        ]);
        $item = Item::factory()->create([
        ]);

        $trade->items()->attach($item);

        //Request parameters being passed as headers array in request??..
        $response = $this->get(route('offer.edit'), [
            'trade_id' => $trade->id,
            'item_id' => $item->id
        ]);

        $response->assertOk();
        $response->assertViewIs('offer.edit');
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

        //CREATE REQUEST NOT WORKING
        $response = $this->actingAs($this->user)->get(route('offer.create'), [
            'trade_id' => $trade->id,
            'character_id' => $character->id
        ]);

        $response->assertOk();
        $response->assertViewIs('offer.create');
    }


    /**
     * @test
     */
    public function store_attaches_offer_to_trade()
    {
        $item = Item::factory()->create([
            'tier' => 3,
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
            'tier' => $item->tier,
            'description' => "offered"
        ]);

        $response = $this->post(route('offer.store'), [
            'trade_id' => $trade->id,
            'item_id' => $offer->id
        ]);

        //check if trade now has $offer in items()
        $this->assertTrue($trade->items()->get()->contains($offer));

        //add redirect assertion if we change redirect to specific view
    }

    /**
     * @test
     */
    public function update_replaces_offer_item()
    {
        //create listed trade item, offers and new offer to replace one of existing
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $item = Item::factory()->create([
            'description' => "listed",
            'tier' => 3,
            'id' => 111
        ]);
        $oldOffer = Item::factory()->create([
            'tier' => $item->tier,
            'character_id' => $character->id,
            'description' => "testold",
            'id' => 789
        ]);
        $newOffer = Item::factory()->create([
            'tier' => $item->tier,
            'character_id' => $character->id,
            'description' => "testnew",
            'id' => 345
        ]);

        $trade = Trade::factory()->create([
            'id' => 101,
            'item_id' => $item->id
        ]);
        $trade->item()->associate($item);
        $trade->items()->attach($oldOffer);

        //NOT PASSING TRADE & OFFER
        $response = $this->actingAs($this->user)->put(route('offer.update'), [
            'item_id' => $newOffer->id,
            'replace_id' => $oldOffer->id,
            'trade_id' => $trade->id
        ]);

        $this->assertTrue($trade->items()->get()->contains($newOffer));

        //add redirect assertion if we change redirect to specific view
    }
}
