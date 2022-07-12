<?php

namespace Tests\Unit\Models;

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

class SessionTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function open_seats_are_calculated_properly()
    {
        $sessionEmpty = Session::factory()->create([
            'seats' => 10,
        ]);

        $sessionHalf = Session::factory()->has(Character::factory(5))->create([
            'seats' => 10,
        ]);

        $sessionFull = Session::factory()->has(Character::factory(10))->create([
            'seats' => 10,
        ]);

        $this->assertEquals(10, $sessionEmpty->open_seats);
        $this->assertEquals(5, $sessionHalf->open_seats);
        $this->assertEquals(0, $sessionFull->open_seats);
    }

    /**
     * @test
     */
    public function can_be_filtered_by_registered_user()
    {
        $characterFactory = Character::factory()->has(User::factory());
        $sessionFactory = Session::factory()->has($characterFactory);
        $event = Event::factory()->has($sessionFactory)->create();
        // Create sessions that _shouldn't_ be returned
        Event::factory(3)->has(Session::factory(5))->create();
        $user = $event->sessions[0]->characters[0]->user;

        $filtered = Session::whereRegistered($event->id, $user->id)->get();
        Auth::login($user);
        $filteredViaLogin = Session::whereRegistered($event->id)->get();

        $this->assertEquals($event->sessions[0]->fresh(), $filtered[0]);
        $this->assertEquals($filtered[0], $filteredViaLogin[0]);
    }

    /**
     * @test
     */
    public function overlaps_with_test()
    {
        $dateA0 = Carbon::now();
        $dateA1 = Carbon::now()->addHours(4);

        $dateB0 = Carbon::now()->addHours(5);
        $dateB1 = Carbon::now()->addHours(9);

        $dateC0 = Carbon::now()->addHours(6);
        $dateC1 = Carbon::now()->addHours(10);

        $dateD0 = Carbon::now()->addHours(11);
        $dateD1 = Carbon::now()->addHours(15);

        $sessionA = Session::factory()->create([
            'start_time' => $dateA0,
            'end_time' => $dateA1,
        ]);

        $sessionB = Session::factory()->create([
            'start_time' => $dateB0,
            'end_time' => $dateB1,
        ]);

        $sessionC = Session::factory()->create([
            'start_time' => $dateC0,
            'end_time' => $dateC1,
        ]);

        $sessionD = Session::factory()->create([
            'start_time' => $dateD0,
            'end_time' => $dateD1,
        ]);

        $sessionE = Session::factory()->create([
            'start_time' => $dateD0,
            'end_time' => $dateD1,
        ]);

        //A and B
        $this->assertFalse($sessionA->overlapsWith($sessionB));
        $this->assertFalse($sessionB->overlapsWith($sessionA));

        //A and C
        $this->assertFalse($sessionA->overlapsWith($sessionC));
        $this->assertFalse($sessionC->overlapsWith($sessionA));

        //A and D
        $this->assertFalse($sessionA->overlapsWith($sessionD));
        $this->assertFalse($sessionD->overlapsWith($sessionA));

        //B and C
        $this->assertTrue($sessionB->overlapsWith($sessionC));
        $this->assertTrue($sessionC->overlapsWith($sessionB));

        //B and D
        $this->assertFalse($sessionB->overlapsWith($sessionD));
        $this->assertFalse($sessionD->overlapsWith($sessionB));

        //C and D
        $this->assertFalse($sessionC->overlapsWith($sessionD));
        $this->assertFalse($sessionD->overlapsWith($sessionC));

        //D and E
        $this->assertTrue($sessionD->overlapsWith($sessionE));
        $this->assertTrue($sessionE->overlapsWith($sessionD));
    }
}
