<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Item;
use App\Models\Offer;
use App\Models\Trade;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\OfferController
 */
class OfferControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function index_displays_view()
    {
        $offers = Offer::factory()->count(3)->create();

        $response = $this->get(route('offer.index'));

        $response->assertOk();
        $response->assertViewIs('offer.index');
        $response->assertViewHas('offers');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('offer.create'));

        $response->assertOk();
        $response->assertViewIs('offer.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\OfferController::class,
            'store',
            \App\Http\Requests\OfferStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $trade = Trade::factory()->create();
        $item = Item::factory()->create();

        $response = $this->post(route('offer.store'), [
            'trade_id' => $trade->id,
            'item_id' => $item->id,
        ]);

        $offers = Offer::query()
            ->where('trade_id', $trade->id)
            ->where('item_id', $item->id)
            ->get();
        $this->assertCount(1, $offers);
        $offer = $offers->first();

        $response->assertRedirect(route('offer.index'));
        $response->assertSessionHas('offer.id', $offer->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $offer = Offer::factory()->create();

        $response = $this->get(route('offer.show', $offer));

        $response->assertOk();
        $response->assertViewIs('offer.show');
        $response->assertViewHas('offer');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $offer = Offer::factory()->create();

        $response = $this->get(route('offer.edit', $offer));

        $response->assertOk();
        $response->assertViewIs('offer.edit');
        $response->assertViewHas('offer');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\OfferController::class,
            'update',
            \App\Http\Requests\OfferUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $offer = Offer::factory()->create();
        $trade = Trade::factory()->create();
        $item = Item::factory()->create();

        $response = $this->put(route('offer.update', $offer), [
            'trade_id' => $trade->id,
            'item_id' => $item->id,
        ]);

        $offer->refresh();

        $response->assertRedirect(route('offer.index'));
        $response->assertSessionHas('offer.id', $offer->id);

        $this->assertEquals($trade->id, $offer->trade_id);
        $this->assertEquals($item->id, $offer->item_id);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $offer = Offer::factory()->create();

        $response = $this->delete(route('offer.destroy', $offer));

        $response->assertRedirect(route('offer.index'));

        $this->assertDeleted($offer);
    }
}
