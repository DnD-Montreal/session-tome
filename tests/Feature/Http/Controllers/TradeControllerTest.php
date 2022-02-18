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
class TradeControllerTest extends TestCase
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
    public function index_displays_view()
    {
        $trades = Trade::factory(3)->has(Item::factory(3), 'offers')->create();

        $response = $this->get(route('trade.index', [
            'search' => $trades->first()->description,
            'item_name' => $trades->first()->item->first()->name,
            'item_description' => $trades->first()->item->first()->description,
            'item_rarity' => $trades->first()->item->first()->rarity,
        ]));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Trade/Trade')
                ->has('trades', 1)
        );
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('trade.create'));

        $response->assertOk();
        $response->assertViewIs('trade.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\TradeController::class,
            'store',
            \App\Http\Requests\TradeStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $item = Item::factory()->create();
        $character = Character::factory()->create();
        $requested_items = $this->faker->word();
        $description = $this->faker->text();
        $status = $this->faker->randomElement(['open', 'closed']);

        $response = $this->post(route('trade.store'), [
            'item_id' => $item->id,
            'character_id' => $character->id,
            'requested_items' => $requested_items,
            'description' => $description,
            'status' => $status,
        ]);

        $trades = Trade::query()
            ->where('item_id', $item->id)
            ->where('character_id', $character->id)
            ->where('requested_items', $requested_items)
            ->where('description', $description)
            ->where('status', $status)
            ->get();
        $this->assertCount(1, $trades);
        $trade = $trades->first();

        $response->assertRedirect(route('trade.index'));
        $response->assertSessionHas('trade.id', $trade->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $tradeRouteString = 'trade.show';

        $someUser = User::factory()->create();
        $character = Character::factory()->create(["user_id" => $someUser->id]);
        $item = Item::factory()->create(["character_id" => $character->id]);
        $trade = Trade::factory()->create([
            "character_id" => $character->id,
            "item_id" => $item->id]);

        $response = $this->get(route($tradeRouteString, $trade));

        $response->assertOk();
        $response->assertViewIs($tradeRouteString);
        $response->assertViewHas('trade');
        $response->assertViewHas('tradeItem');
        $response->assertViewHas('tradeCharacter');
        $response->assertViewMissing('tradeOffers');

        $character->user()->associate($this->user)->save();
        $response = $this->get(route($tradeRouteString, $trade));

        $response->assertOk();
        $response->assertViewIs($tradeRouteString);
        $response->assertViewHas('trade');
        $response->assertViewHas('tradeItem');
        $response->assertViewHas('tradeCharacter');
        $response->assertViewHas('tradeOffers');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $trade = Trade::factory()->create();

        $response = $this->get(route('trade.edit', $trade));

        $response->assertOk();
        $response->assertViewIs('trade.edit');
        $response->assertViewHas('trade');
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
        $trade = Trade::factory()->create();
        $item = Item::factory()->create();
        $character = Character::factory()->create();
        $requested_items = $this->faker->word;
        $description = $this->faker->text;
        $status = $this->faker->randomElement(['open', 'closed']);

        $response = $this->put(route('trade.update', $trade), [
            'item_id' => $item->id,
            'character_id' => $character->id,
            'requested_items' => $requested_items,
            'description' => $description,
            'status' => $status,
        ]);

        $trade->refresh();

        $response->assertRedirect(route('trade.index'));
        $response->assertSessionHas('trade.id', $trade->id);

        $this->assertEquals($item->id, $trade->item_id);
        $this->assertEquals($character->id, $trade->character_id);
        $this->assertEquals($requested_items, $trade->requested_items);
        $this->assertEquals($description, $trade->description);
        $this->assertEquals($status, $trade->status);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $trade = Trade::factory()->create();

        $response = $this->delete(route('trade.destroy', $trade));

        $response->assertRedirect(route('trade.index'));

        $this->assertDeleted($trade);
    }
}
