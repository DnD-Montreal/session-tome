<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\League;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\LeagueController
 */
class LeagueControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function index_displays_view()
    {
        $leagues = League::factory()->count(3)->create();

        $response = $this->get(route('league.index'));

        $response->assertOk();
        $response->assertViewIs('league.index');
        $response->assertViewHas('leagues');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('league.create'));

        $response->assertOk();
        $response->assertViewIs('league.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\LeagueController::class,
            'store',
            \App\Http\Requests\LeagueStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $description = $this->faker->text;

        $response = $this->post(route('league.store'), [
            'name' => $name,
            'description' => $description,
        ]);

        $leagues = League::query()
            ->where('name', $name)
            ->where('description', $description)
            ->get();
        $this->assertCount(1, $leagues);
        $league = $leagues->first();

        $response->assertRedirect(route('league.index'));
        $response->assertSessionHas('league.id', $league->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $league = League::factory()->create();

        $response = $this->get(route('league.show', $league));

        $response->assertOk();
        $response->assertViewIs('league.show');
        $response->assertViewHas('league');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $league = League::factory()->create();

        $response = $this->get(route('league.edit', $league));

        $response->assertOk();
        $response->assertViewIs('league.edit');
        $response->assertViewHas('league');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\LeagueController::class,
            'update',
            \App\Http\Requests\LeagueUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $league = League::factory()->create();
        $name = $this->faker->name;
        $description = $this->faker->text;

        $response = $this->put(route('league.update', $league), [
            'name' => $name,
            'description' => $description,
        ]);

        $league->refresh();

        $response->assertRedirect(route('league.index'));
        $response->assertSessionHas('league.id', $league->id);

        $this->assertEquals($name, $league->name);
        $this->assertEquals($description, $league->description);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $league = League::factory()->create();

        $response = $this->delete(route('league.destroy', $league));

        $response->assertRedirect(route('league.index'));

        $this->assertDeleted($league);
    }
}
