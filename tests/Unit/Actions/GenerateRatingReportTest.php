<?php

namespace Tests\Unit\Actions;

use App\Actions\GenerateRatingReport;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class GenerateRatingReportTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_report_containing_rating_statistics_is_compiled()
    {
        $today = now()->toDateString();
        $suffix = 'rating-report';
        $users = User::factory(10)->create();
        $users->each(function ($user) {
            Rating::factory(10)->create(['user_id' => $user->id]);
        });

        $responseStream = TestResponse::fromBaseResponse(GenerateRatingReport::run());

        $responseStream->assertOk();
        $responseStream->assertDownload("{$today}-{$suffix}.csv");
    }
}
