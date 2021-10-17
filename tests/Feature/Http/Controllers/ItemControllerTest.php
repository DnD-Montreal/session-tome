<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\ItemController
 */
class ItemControllerTest extends TestCase
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
        $items = Item::factory()->count(3)->create();
        $character = $items[0]->character;
        $character->items()->saveMany($items);
        $character->save();


        $response = $this->get(route('item.index') . "?character_id={$character->id}");
        $responseEmpty = $this->get(route('item.index'));

        $response->assertOk();
        $responseEmpty->assertOk();
        $response->assertViewIs('item.index');
        // Check the items returned belong to the character we're checking.
        $response->assertViewHas('items', function ($items) use ($character) {
            $res = true;
            foreach ($items->pluck('character_id') as $id) {
                $res = $res && $id == $character->id;
            }
            return $res;
        });
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('item.create'));

        $response->assertOk();
        $response->assertViewIs('item.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ItemController::class,
            'store',
            \App\Http\Requests\ItemStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $entry = Entry::factory()->create();
        $character = Character::factory()->create();
        $name = $this->faker->name;
        $rarity = $this->faker->randomElement(["common","uncommon","rare","very_rare","legendary"]);
        $tier = $this->faker->word;
        $description = $this->faker->text;
        $counted = $this->faker->word;

        $response = $this->actingAs($character->user)->post(route('item.store'), [
            'entry_id' => $entry->id,
            'character_id' => $character->id,
            'name' => $name,
            'rarity' => $rarity,
            'tier' => $tier,
            'description' => $description,
            'counted' => $counted,
        ]);

        $items = Item::query()
            ->where('entry_id', $entry->id)
            ->where('character_id', $character->id)
            ->where('name', $name)
            ->where('rarity', $rarity)
            ->where('tier', $tier)
            ->where('description', $description)
            ->where('counted', $counted)
            ->get();

        $this->assertCount(1, $items);
        $item = $items->first();

        $response->assertRedirect(route('item.index'));
        $response->assertSessionHas('item.id', $item->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $item = Item::factory()->create();

        $response = $this->get(route('item.show', $item));

        $response->assertOk();
        $response->assertViewIs('item.show');
        $response->assertViewHas('item');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $item = Item::factory()->create();

        $response = $this->get(route('item.edit', $item));

        $response->assertOk();
        $response->assertViewIs('item.edit');
        $response->assertViewHas('item');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\ItemController::class,
            'update',
            \App\Http\Requests\ItemUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $item = Item::factory()->create();
        $entry = Entry::factory()->create();
        $character = Character::factory()->create();
        $name = $this->faker->name;
        $rarity = $this->faker->randomElement(["common","uncommon","rare","very_rare","legendary"]);
        $tier = $this->faker->word;
        $description = $this->faker->text;
        $counted = $this->faker->word;

        $response = $this->actingAs($item->user())->put(route('item.update', $item), [
            'entry_id' => $entry->id,
            'character_id' => $character->id,
            'name' => $name,
            'rarity' => $rarity,
            'tier' => $tier,
            'description' => $description,
            'counted' => $counted,
        ]);

        $item->refresh();

        $response->assertRedirect(route('item.index'));
        $response->assertSessionHas('item.id', $item->id);

        $this->assertEquals($entry->id, $item->entry_id);
        $this->assertEquals($character->id, $item->character_id);
        $this->assertEquals($name, $item->name);
        $this->assertEquals($rarity, $item->rarity);
        $this->assertEquals($tier, $item->tier);
        $this->assertEquals($description, $item->description);
        $this->assertEquals($counted, $item->counted);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $item = Item::factory()->create();

        $response = $this->delete(route('item.destroy', $item));

        $response->assertRedirect(route('item.index'));

        $this->assertDeleted($item);
    }
}
