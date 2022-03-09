<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Event;
use App\Models\Character;
use App\Models\Session;
use App\Models\League;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;
use Inertia\Testing\Assert;

/**
 * @see \App\Http\Controllers\EventController
 */
class EventControllerTest extends TestCase
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
        $characterFactory = Character::factory()->has(User::factory());
        $sessionFactory = Session::factory()->has($characterFactory);
        $event = Event::factory()->has($sessionFactory)->create();
        // Create events that _shouldn't_ be returned
        Event::factory(3)->has(Session::factory(5))->create();
        $user = $event->sessions[0]->characters[0]->user;

        $response = $this->actingAs($user)->get(route('event.index', [
            'search' => $event->title,
            'registered_only' => true,
            'registered_user' => $user->id,
        ]));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                    ->component('Event/Event')
                    ->has(
                        'events',
                        1,
                        fn (Assert $page) => $page
                        ->where('id', $event->id)
                        ->where('league_id', $event->league_id)
                        ->where('title', $event->title)
                        ->where('description', $event->description)
                        ->where('location', $event->location)
                        ->etc()
                        ->has('league')
                    )
        );
    }

    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('event.create'));

        $response->assertOk();
        $response->assertViewIs('event.create');
    }

    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\EventController::class,
            'store',
            \App\Http\Requests\EventStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $league = League::factory()->create();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->post(route('event.store'), [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $events = Event::query()
            ->where('league_id', $league->id)
            ->where('title', $title)
            ->where('description', $description)
            ->where('location', $location)
            ->get();
        $this->assertCount(1, $events);
        $event = $events->first();

        $response->assertRedirect(route('event.index'));
        $response->assertSessionHas('event.id', $event->id);
    }

    /**
     * @test
     */
    public function show_displays_view()
    {
        $event = Event::factory()->create();

        $response = $this->get(route('event.show', $event));

        $response->assertOk();
        $response->assertViewIs('event.show');
        $response->assertViewHas('event');
    }

    /**
     * @test
     */
    public function edit_displays_view()
    {
        $event = Event::factory()->create();

        $response = $this->get(route('event.edit', $event));

        $response->assertOk();
        $response->assertViewIs('event.edit');
        $response->assertViewHas('event');
    }

    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\EventController::class,
            'update',
            \App\Http\Requests\EventUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $event = Event::factory()->create();
        $league = League::factory()->create();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->put(route('event.update', $event), [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $event->refresh();

        $response->assertRedirect(route('event.index'));
        $response->assertSessionHas('event.id', $event->id);

        $this->assertEquals($league->id, $event->league_id);
        $this->assertEquals($title, $event->title);
        $this->assertEquals($description, $event->description);
        $this->assertEquals($location, $event->location);
    }

    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $event = Event::factory()->create();

        $response = $this->delete(route('event.destroy', $event));

        $response->assertRedirect(route('event.index'));

        $this->assertDeleted($event);
    }
}
