<?php

namespace Tests\Unit\Models;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class EventTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_have_entries()
    {
        Entry::factory(1)->create();
        $event = Event::has('entries')->first();

        $this->assertCount(1, $event->entries);
    }

    /**
     * @test
    */
    public function can_have_sessions()
    {
        Session::factory(1)->create();
        $event = Event::first();

        $this->assertCount(1, $event->sessions()->get());
    }


    /**
     * @test
     */
    public function can_belong_to_league()
    {
        $event = Event::factory()->create();

        $this->assertCount(1, $event->league()->get());
    }

    /**
     * @test
     */
    public function can_be_filtered_by_registered_user()
    {
        $event = $this->generateRegisteredEvent();
        // Create events that _shouldn't_ be returned
        Event::factory(3)->has(Session::factory(5))->create();
        $user = $event->sessions[0]->characters[0]->user;

        $filtered = Event::whereRegistered($user->id)->get();
        Auth::login($user);
        $filteredViaLogin = Event::whereRegistered()->get();

        $this->assertEquals($event->fresh(), $filtered[0]);
        $this->assertEquals($filtered[0], $filteredViaLogin[0]);
    }


    /**
     * @test
     */
    public function can_calculate_seat_availability()
    {
        $startDate = now();
        $sessions = Session::factory(3)->has(Character::factory(3))->state([
            'seats' => 10,
            'start_time' => $startDate
        ]);
        $event = Event::factory()->has($sessions)->create();

        $total = $event->total_seats;
        $taken = $event->seats_taken;
        $left = $event->seats_left;

        // 3 sessions with 10 seats each = 30
        $this->assertEquals(30, $total);
        // 3 characters per session, 3 sessions = 9
        $this->assertEquals(9, $taken);
        // 30 seats, 9 characters = 21
        $this->assertEquals(21, $left);
    }

    /**
     * @test
     */
    public function is_registered_shows_when_authenticated_user_is_registered()
    {
        $event = $this->generateRegisteredEvent();
        // Create events that _shouldn't_ be returned
        $otherEvents = Event::factory(3)->has(Session::factory(5))->create();
        $user = $event->sessions[0]->characters[0]->user;
        Auth::login($user);

        $registeredEvent = $event->is_registered;
        $nonRegisteredEvents = $otherEvents->map(fn ($e) => $e->is_registered);

        $this->assertTrue($registeredEvent);
        foreach ($nonRegisteredEvents as $registeredBool) {
            $this->assertFalse($registeredBool);
        }
    }

    /**
     * @test
     */
    public function can_get_scheduled_event_date_range()
    {
        $today = now()->startOfSecond();
        $tomorrow = $today->addDay();
        $firstSession = Session::factory()->state([
           'start_time' => $today
        ]);
        $secondSession = Session::factory()->state([
           'start_time' => $tomorrow
        ]);

        $event = Event::factory()
            ->has($firstSession)
            ->has($secondSession)
            ->create();

        $dates = $event->scheduled_dates;

        $this->assertEquals($today, $dates[0]);
        $this->assertEquals($tomorrow, $dates[1]);
    }

    /**
     * Utility function to generate registered events
     *
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Database\Eloquent\Model
     */
    private function generateRegisteredEvent()
    {
        $characterFactory = Character::factory()->has(User::factory());
        $sessionFactory = Session::factory()->has($characterFactory);
        return Event::factory()->has($sessionFactory)->create();
    }
}
