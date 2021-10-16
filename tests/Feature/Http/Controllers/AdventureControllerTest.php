<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\AdventureController
 */
class AdventureControllerTest extends TestCase
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
        $adventures = Adventure::factory()->count(3)->create();

        $response = $this->get(route('adventure.index'));

        $response->assertOk();
        $response->assertViewIs('adventure.index');
        $response->assertViewHas('adventures');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('adventure.create'));

        $response->assertOk();
        $response->assertViewIs('adventure.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\AdventureController::class,
            'store',
            \App\Http\Requests\AdventureStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $title = $this->faker->sentence(4);
        $code = $this->faker->word;
        $description = $this->faker->text;

        $response = $this->post(route('adventure.store'), [
            'title' => $title,
            'code' => $code,
            'description' => $description,
        ]);

        $adventures = Adventure::query()
            ->where('title', $title)
            ->where('code', $code)
            ->where('description', $description)
            ->get();
        $this->assertCount(1, $adventures);
        $adventure = $adventures->first();

        $response->assertRedirect(route('adventure.index'));
        $response->assertSessionHas('adventure.id', $adventure->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $adventure = Adventure::factory()->create();

        $response = $this->get(route('adventure.show', $adventure));

        $response->assertOk();
        $response->assertViewIs('adventure.show');
        $response->assertViewHas('adventure');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $adventure = Adventure::factory()->create();

        $response = $this->get(route('adventure.edit', $adventure));

        $response->assertOk();
        $response->assertViewIs('adventure.edit');
        $response->assertViewHas('adventure');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\AdventureController::class,
            'update',
            \App\Http\Requests\AdventureUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $adventure = Adventure::factory()->create();
        $title = $this->faker->sentence(4);
        $code = $this->faker->word;
        $description = $this->faker->text;

        $response = $this->put(route('adventure.update', $adventure), [
            'title' => $title,
            'code' => $code,
            'description' => $description,
        ]);

        $adventure->refresh();

        $response->assertRedirect(route('adventure.index'));
        $response->assertSessionHas('adventure.id', $adventure->id);

        $this->assertEquals($title, $adventure->title);
        $this->assertEquals($code, $adventure->code);
        $this->assertEquals($description, $adventure->description);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $adventure = Adventure::factory()->create();

        $response = $this->delete(route('adventure.destroy', $adventure));

        $response->assertRedirect(route('adventure.index'));

        $this->assertDeleted($adventure);
    }
}
