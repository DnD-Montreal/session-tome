<?php

namespace Tests\Unit\Models;

use App\Models\Event;
use App\Models\League;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class LeagueTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_belong_to_users()
    {
        $league = League::factory(1)->create()[0];
        $user = User::factory(1)->create();
        $league->users()->attach($user);

        $this->assertCount(1, $league->users()->get());
    }

    /**
     * @test
     */
    public function can_have_events()
    {
        Event::factory(1)->create();
        $league = League::first();

        $this->assertCount(1, $league->events()->get());
    }
}
