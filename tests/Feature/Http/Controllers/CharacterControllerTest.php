<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\CharacterController
 */
class CharacterControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function index_displays_view()
    {
        $characters = Character::factory()->count(3)->create();

        $response = $this->actingAs(User::first())->get(route('character.index'));

        $response->assertOk();
        $response->assertViewIs('character.index');
        $response->assertViewHas('characters');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('character.create'));

        $response->assertOk();
        $response->assertViewIs('character.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\CharacterController::class,
            'store',
            \App\Http\Requests\CharacterStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        User::factory()->create();
        $name = $this->faker->name;
        $race = $this->faker->word;
        $class = $this->faker->word;
        $level = $this->faker->numberBetween(1, 20);
        $faction = $this->faker->word;
        $downtime = $this->faker->word;
        $status = $this->faker->word;

        $response = $this->actingAs(User::first())->post(route('character.store'), [
            'name' => $name,
            'race' => $race,
            'class' => $class,
            'level' => $level,
            'faction' => $faction,
            'downtime' => $downtime,
            'status' => $status,
        ]);

        $characters = Character::query()
            ->where('name', $name)
            ->where('race', $race)
            ->where('class', $class)
            ->where('level', $level)
            ->where('faction', $faction)
            ->where('downtime', $downtime)
            ->where('status', $status)
            ->get();
        $this->assertCount(1, $characters);
        $character = $characters->first();

        $response->assertRedirect(route('character.index'));
        $response->assertSessionHas('character.id', $character->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $character = Character::factory()->create();

        $response = $this->get(route('character.show', $character));

        $response->assertOk();
        $response->assertViewIs('character.show');
        $response->assertViewHas('character');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $character = Character::factory()->create();

        $response = $this->get(route('character.edit', $character));

        $response->assertOk();
        $response->assertViewIs('character.edit');
        $response->assertViewHas('character');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\CharacterController::class,
            'update',
            \App\Http\Requests\CharacterUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $character = Character::factory()->create();
        $name = $this->faker->name;
        $race = $this->faker->word;
        $class = $this->faker->word;
        $level = $this->faker->numberBetween(1, 20);
        $faction = $this->faker->word;
        $downtime = $this->faker->word;
        $status = $this->faker->word;

        $response = $this->put(route('character.update', $character), [
            'name' => $name,
            'race' => $race,
            'class' => $class,
            'level' => $level,
            'faction' => $faction,
            'downtime' => $downtime,
            'status' => $status,
        ]);

        $character->refresh();

        $response->assertRedirect(route('character.index'));
        $response->assertSessionHas('character.id', $character->id);

        $this->assertEquals($name, $character->name);
        $this->assertEquals($race, $character->race);
        $this->assertEquals($class, $character->class);
        $this->assertEquals($level, $character->level);
        $this->assertEquals($faction, $character->faction);
        $this->assertEquals($downtime, $character->downtime);
        $this->assertEquals($status, $character->status);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $character = Character::factory()->create();

        $response = $this->delete(route('character.destroy', $character));

        $response->assertRedirect(route('character.index'));

        $this->assertDeleted($character);
    }
}
