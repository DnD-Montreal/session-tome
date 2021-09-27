<?php

namespace Tests\Unit\Models;

use App\Models\Entry;
use App\Models\Event;
use App\Models\League;
use App\Models\Session;
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
}
