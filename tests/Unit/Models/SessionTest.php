<?php

namespace Tests\Unit\Models;

use App\Models\Character;
use App\Models\Session;
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
}
