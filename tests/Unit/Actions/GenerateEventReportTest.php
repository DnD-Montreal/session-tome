<?php

namespace Tests\Unit\Actions;

use App\Actions\GenerateEventReport;
use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\TestResponse;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class GenerateEventReportTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_report_containing_event_data_is_compiled()
    {
        $today = now()->toDateString();
        $suffix = 'event-report';
        $event = Event::factory()->create();
        $sessions = Session::factory(4)->create(['event_id' => $event->id]);
        $users = User::factory(10)->create();
        foreach ($users as $user) {
            $char = Character::factory()->create(['user_id' => $user->id]);
            $sessions->random()->characters()->attach($char);
        }

        $responseStream = TestResponse::fromBaseResponse(GenerateEventReport::run($event));

        $responseStream->assertOk();
        $responseStream->assertDownload("{$today}-{$suffix}.csv");
    }
}
