<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class EventRegistrationRequestTest extends TestCase
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
            'user_id' => $this->user->id
        ]);
        $event = Event::factory()->has(Session::factory(1))->create();

        $response = $this->post(route('registration.store', [
            'session_id' => $event->sessions[0]->id,
            'character_id' => $character->id
        ]));

        $response->assertRedirect();
        $this->assertDatabaseCount('character_session', 1);
    }

    /**
     * @test
     */
    public function store_prevents_a_character_from_registering_for_a_full_session()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $fullEvent = Event::factory()
            ->has(Session::factory(1)->state(['seats' => 3])->has(Character::factory(3)))
            ->create();

        $response = $this->post(route('registration.store', [
            'session_id' => $fullEvent->sessions[0]->id,
            'character_id' => $character->id
        ]));

        $response->assertUnprocessable();
    }

    public function store_chooses_a_random_session_if_only_event_is_supplied()
    {
        $character = Character::factory()->create([
            'user_id' => $this->user->id
        ]);
        $event = Event::factory()->has(Session::factory(3))->create();

        $response = $this->post(route('registration.store', [
            'event_id' => $event->id,
            'character_id' => $character->id
        ]));

        $response->assertRedirect();
    }
}
