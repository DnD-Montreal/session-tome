<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\Event;
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
        $event_user = $event->sessions[0]->characters[0]->user;

        $response = $this->actingAs($event_user)->get(route('event.index', [
            'search' => $event->title,
            'registered_only' => true,
            'registered_user' => $event_user->id,
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
    public function index_without_passing_registered_user()
    {
        $characterFactory = Character::factory()->has(User::factory());
        $sessionFactory = Session::factory()->has($characterFactory);
        $event = Event::factory()->has($sessionFactory)->create();
        // Create events that _shouldn't_ be returned
        Event::factory(3)->has(Session::factory(5))->create();
        $registered_user = $event->sessions[0]->characters[0]->user;

        $response = $this->actingAs($registered_user)->get(route('event.index', [
            'registered_only' => true,
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
    public function show_filters_sessions()
    {
        $characterFactory = Character::factory()->has(User::factory());
        $sessionFactory = Session::factory()->has($characterFactory);
        $nonRegisteredSession = Session::factory();
        $event = Event::factory()
            ->has($sessionFactory)
            ->has($nonRegisteredSession)
            ->create();

        $request_user = $event->sessions[0]->characters[0]->user;

        $filterdResponse = $this->actingAs($request_user)->get(route('event.show', [
            'event' => $event,
            'registered_sessions' => true
        ]));

        $filterdResponse->assertOk();
        $filterdResponse->assertInertia(
            fn (Assert $page) => $page
                ->component('Event/Detail/EventDetail')
                ->has('event')
                ->has('sessions', 1)
        );
    }

    /**
     * @test
     */
    public function show_displays_view()
    {
        $otherUser = User::factory()->create();
        $event = Event::factory()->has(Session::factory()
            ->has(Character::factory(2)->state(['user_id'=>Auth::id()]))
            ->has(Character::factory(2)->state(['user_id'=>$otherUser->id])))->create();

        $response = $this->get(route('event.show', $event));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component('Event/Detail/EventDetail')
                ->has('event')
                ->has('allUserCharacters')
        );
    }
}
