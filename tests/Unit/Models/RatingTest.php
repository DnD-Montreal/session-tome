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

    /**
     * @test
     */
    public function can_remove_categories()
    {
        $categories = Rating::CREATIVE_BITMASK + Rating::FRIENDLY_BITMASK;
        $rating = Rating::factory()->create(['categories' => $categories]);
        $rating->removeCategory(Rating::FRIENDLY_BITMASK);
        $this->assertTrue($rating->hasCategory(Rating::CREATIVE_BITMASK));
        $this->assertFalse($rating->hasCategory(Rating::FRIENDLY_BITMASK));
    }

    /**
     * @test
     */
    public function can_get_category_labels()
    {
        $categories = Rating::FLEXIBLE_BITMASK + Rating::FRIENDLY_BITMASK + Rating::CREATIVE_BITMASK + Rating::HELPFUL_BITMASK + Rating::PREPARED_BITMASK;
        $rating = Rating::factory()->create(['categories' => $categories]);
        $labels = $rating->getCategoryLabels();

        $this->assertContains(Rating::FLEXIBLE_LABEL, $labels);
        $this->assertContains(Rating::HELPFUL_LABEL, $labels);
        $this->assertContains(Rating::PREPARED_LABEL, $labels);
        $this->assertContains(Rating::FRIENDLY_LABEL, $labels);
        $this->assertContains(Rating::CREATIVE_LABEL, $labels);
        $this->assertCount(5, $labels);
    }
}
