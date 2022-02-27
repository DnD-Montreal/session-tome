<?php

namespace Tests\Unit\Models;

use App\Models\Character;
use App\Models\Session;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
            'seats' => 10
        ]);

        $sessionHalf = Session::factory()->has(Character::factory(5))->create([
            'seats' => 10
        ]);

        $sessionFull = Session::factory()->has(Character::factory(10))->create([
            'seats' => 10
        ]);


        $this->assertEquals(10, $sessionEmpty->open_seats);
        $this->assertEquals(5, $sessionHalf->open_seats);
        $this->assertEquals(0, $sessionFull->open_seats);
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
            'end_time' => $dateA1
        ]);

        $sessionB = Session::factory()->create([
            'start_time' => $dateB0,
            'end_time' => $dateB1
        ]);

        $sessionC = Session::factory()->create([
            'start_time' => $dateC0,
            'end_time' => $dateC1
        ]);

        $sessionD = Session::factory()->create([
            'start_time' => $dateD0,
            'end_time' => $dateD1
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
    }
}
