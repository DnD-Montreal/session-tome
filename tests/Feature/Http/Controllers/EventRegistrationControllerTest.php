<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class EventRegistrationControllerTest extends TestCase
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
    public function store_registers_a_character_for_a_session()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $event = Event::factory()->has(Session::factory(1))->create();

        $inputData = [
            'session_id' => $event->sessions[0]->id,
            'character_id' => $character->id,
        ];
        $response = $this->post(route('registration.store', $inputData));

        $response->assertRedirect();
        $this->assertDatabaseCount('character_session', 1);
        $this->assertDatabaseHas('character_session', $inputData);
    }

    /**
     * @test
     */
    public function store_prevents_a_character_from_registering_for_a_full_session()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $fullEvent = Event::factory()
            ->has(Session::factory(1)->state(['seats' => 3])->has(Character::factory(3)))
            ->create();

        $response = $this->post(route('registration.store', [
            'session_id' => $fullEvent->sessions[0]->id,
            'character_id' => $character->id,
        ]));

        $response->assertRedirect();
        $response->assertSessionHasErrors();
    }

    /**
     * @test
     */
    public function store_prevents_a_character_from_registering_for_overlapping_session()
    {
        $startTime = Carbon::now()->addHour();
        $endTime = Carbon::now()->addHours(5);
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $event = Event::factory()
            ->has(Session::factory(2)->state([
                'seats' => 3,
                'start_time' => $startTime,
                'end_time' => $endTime,
            ]))->create();

        $this->post(route('registration.store', [
            'session_id' => $event->sessions[0]->id,
            'character_id' => $character->id,
        ]));

        $response = $this->post(route('registration.store', [
            'session_id' => $event->sessions[1]->id,
            'character_id' => $character->id,
        ]));

        $response->assertRedirect();
        $response->assertSessionHasErrors();
    }

    /**
     * @test
     */
    public function store_chooses_a_random_session_if_only_event_is_supplied()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $event = Event::factory()->has(Session::factory(3))->create();

        $response = $this->post(route('registration.store', [
            'event_id' => $event->id,
            'character_id' => $character->id,
        ]));

        $response->assertRedirect();
        $this->assertDatabaseCount('character_session', 1);
    }

    /**
     * @test
     */
    public function destroy_detaches_session_from_character()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id,
        ]);
        $session = Session::factory()->create();

        $character->sessions()->attach($session);

        $invalid_user = User::factory()->create();

        $response_invalid = $this->actingAs($invalid_user)->delete(route('event-registration.destroy', $session), [
            'character_id' => $character->id,
        ]);

        $response_invalid->assertRedirect();
        $response_invalid->assertSessionHasErrors();

        $response = $this->actingAs($this->user)->delete(route('event-registration.destroy', $session), [
            'character_id' => $character->id,
        ]);

        $response->assertRedirect();
        $this->assertNotContains($session, $character->sessions);
    }
}
