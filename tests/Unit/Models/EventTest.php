<?php

namespace Tests\Unit\Models;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\League;
use App\Models\Session;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
        $event = Event::factory(1)->create()[0];

        $this->assertCount(1, $event->league()->get());
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
}
