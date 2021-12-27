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

    /**
     * @test
     */
    public function can_add_categories()
    {
        $rating = Rating::factory()->create(['categories' => 0]);
        $rating->addCategory(Rating::CREATIVE_BITMASK);
        $this->assertTrue($rating->hasCategory(Rating::CREATIVE_BITMASK));
    }

    /**
     * @test
     */
    public function has_category_helper_function_test()
    {
        $rating = Rating::factory()->create(['categories' => 0]);
        $rating->categories = Rating::FRIENDLY_BITMASK;
        $rating->save();
        $this->assertTrue($rating->hasCategory(Rating::FRIENDLY_BITMASK));
        $this->assertFalse($rating->hasCategory(Rating::CREATIVE_BITMASK));
    }

    /**
     * @test
     */
    public function can_have_multiple_categories()
    {
        $categories = Rating::CREATIVE_BITMASK + Rating::FRIENDLY_BITMASK;
        $rating = Rating::factory()->create(['categories' => $categories]);
        $this->assertTrue($rating->hasCategory(Rating::CREATIVE_BITMASK));
        $this->assertTrue($rating->hasCategory(Rating::FRIENDLY_BITMASK));
    }
}
