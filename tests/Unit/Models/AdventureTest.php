<?php

namespace Tests\Unit\Models;

use App\Models\Adventure;
use App\Models\Session;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class AdventureTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_have_sessions()
    {
        Session::factory(1)->create();
        $adventure = Adventure::first();

        $this->assertCount(1, $adventure->sessions()->get());
    }
}
