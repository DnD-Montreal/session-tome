<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Testing\Assert;
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
        $character = Character::factory()->has(Item::factory()->count(3))->create([
            'user_id' => $this->user->id
        ]);
        $items = $character->items;

        $privateCharacter = Character::factory()->has(Item::factory()->count(3))->create([
            'status' => "private"
        ]);

        $response = $this->get(route('item.index') . "?character_id={$character->id}");
        $responseEmpty = $this->get(route('item.index'));
//        $this->expectException(UnauthorizedException::class);
        $responsePrivate = $this->get(route('item.index') . "?character_id={$privateCharacter->id}");

        $response->assertOk();
        $responseEmpty->assertNotFound();
        ;
        // This is not right, but for some reason expectException is not catching this?
        // We expect this except because the exception handler should render the appropriate view in production.
        $this->assertEquals(UnauthorizedException::class, get_class($responsePrivate->exception));
        $response->assertInertia(function (Assert $page) use ($character) {
            $page->component('Item/Item')
                ->has('items')
                ->has('character');
        });

        // TODO: re-implement below using has() checks to verify prop contains correct values
        // Check the items returned belong to the character we're checking.
//        $response->assertViewHas('items', function ($items) use ($character) {
//            $res = true;
//            foreach ($items->pluck('character_id') as $id) {
//                $res = $res && $id == $character->id;
//            }
//            return $res;
//        });
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
        $tier = $this->faker->numberBetween(1, 4);
        $description = $this->faker->text;
        $author = User::factory()->create();

        $response = $this->actingAs($character->user)->post(route('item.store'), [
            'entry_id' => $entry->id,
            'character_id' => $character->id,
            'name' => $name,
            'rarity' => $rarity,
            'tier' => $tier,
            'description' => $description,
            'author_id' => $author->id
        ]);

        $items = Item::query()
            ->where('entry_id', $entry->id)
            ->where('character_id', $character->id)
            ->where('name', $name)
            ->where('rarity', $rarity)
            ->where('tier', $tier)
            ->where('description', $description)
            ->where('author_id', $author->id)
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
        $response->assertInertia(
            fn (Assert $page) => $page
            ->component("Item/Detail/ItemDetail")
            ->has('item')
            ->has('character')
        );
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
        $tier = $this->faker->numberBetween(1, 4);
        $description = $this->faker->text;
        $author = User::factory()->create();

        $response = $this->actingAs($item->user())->put(route('item.update', $item), [
            'entry_id' => $entry->id,
            'character_id' => $character->id,
            'name' => $name,
            'rarity' => $rarity,
            'tier' => $tier,
            'description' => $description,
            'author_id' => $author->id
        ]);

        $item->refresh();

        $response->assertRedirect(route('character.show', $character->id));
        $response->assertSessionHas('item.id', $item->id);

        $this->assertEquals($entry->id, $item->entry_id);
        $this->assertEquals($character->id, $item->character_id);
        $this->assertEquals($name, $item->name);
        $this->assertEquals($rarity, $item->rarity);
        $this->assertEquals($tier, $item->tier);
        $this->assertEquals($description, $item->description);
        $this->assertEquals($author->id, $item->author_id);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $item = Item::factory()->create();
        $character_id = $item->character_id;

        $response = $this->delete(route('item.destroy', $item));

        $response->assertRedirect(route('item.index', compact('character_id')));

        $this->assertDeleted($item);
    }
}
