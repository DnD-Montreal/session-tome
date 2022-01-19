<?php

namespace Tests\Unit\Observers;

use App\Models\Campaign;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class CampaignObserverTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function unique_campaigns_code_generated_after_creation()
    {
        $campaigns = Campaign::factory(3)->create();

        $this->assertDatabaseCount(Campaign::class, 3);

        Campaign::all()->each(function ($campaign) use ($campaigns) {
            $this->assertNotNull($campaign->code);
            for ($i = 0; $i < 3; $i++) {
                if ($campaign->id == $campaigns[$i]->id) {
                    $this->assertEquals($campaign->code, $campaigns[$i]->code);
                } else {
                    $this->assertNotEquals($campaign->code, $campaigns[$i]->code);
                }
            }
        });
    }
}
