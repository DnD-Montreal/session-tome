<?php

namespace Tests\Unit\Models;

use App\Models\Rating;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class RatingTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function can_belong_to_entry()
    {
        $rating = Rating::factory(1)->create()[0];
        $this->assertCount(1, $rating->entry()->get());
    }

    /**
     * @test
     */
    public function can_be_about_user()
    {
        $rating = Rating::factory(1)->create()[0];
        $this->assertCount(1, $rating->user()->get());
    }

    /**
     * @test
     */
    public function can_belong_to_author()
    {
        $rating = Rating::factory(1)->create()[0];
        $this->assertCount(1, $rating->author()->get());
    }
}
