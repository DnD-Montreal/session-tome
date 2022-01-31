<?php

namespace Tests\Unit\Actions;

use App\Actions\GenerateRatingReport;
use App\Actions\StreamCsvFile;
use App\Models\Event;
use App\Models\Rating;
use App\Models\User;
use App\Models\League;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class GenerateLeagueRatingReportTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     * test can be improved by explicitly creating different leagues and making assertion on expected
     * number of ratings exported for a specified league
     */
    public function a_report_containing_league_ratings_is_compiled()
    {
        $today = now()->toDateString();
        $suffix = "league-rating-report";
        $users = User::factory(10)->create();
        $users->each(function ($user) {
            Rating::factory(10)->create(['user_id' => $user->id]);
        });

        $rating = Rating::first();
        $league = $rating->entry->event->league;

        $responseStream = TestResponse::fromBaseResponse(GenerateRatingReport::run(true, $league));

        $responseStream->assertOk();
        $responseStream->assertDownload("{$today}-{$suffix}.csv");
    }
}
