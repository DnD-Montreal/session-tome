<?php

namespace Tests\Feature\Http\Controllers;

use App\Facades\Beyond;
use App\Models\Character;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;

use JMac\Testing\Traits\AdditionalAssertions;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Tests\TestCase;

class AdventuresLeagueImportControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_user_can_import_an_adventures_league_character()
    {
        $user = User::factory()->create();
        $csv = new UploadedFile(database_path('mocks/grod.csv'), "grod.csv");
        $response = $this->actingAs($user)->post('/adventures-league-import', ['logs' => $csv]);

        $content = $response->getOriginalContent();
        $character = $content['data'];
        $response->assertStatus(200);
        $this->assertEquals("Grod", $character->name);
        $this->assertEquals("Half orc", $character->race);
        $this->assertEquals("Fighter", $character->class);
        $this->assertEquals(1, $character->level);
    }

    /**
     * @test
     */
    public function response_failure_if_invalid_file_format()
    {
        $user = User::factory()->create();
        $csv = new UploadedFile(database_path('mocks/grod-bad.csv'), "grod-bad.csv");
        $response = $this->actingAs($user)->post('/adventures-league-import', ['logs' => $csv]);
        $response->assertStatus(400);
    }

    /**
     * @test
     */
    public function response_failure_if_missing_file()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/adventures-league-import');
        $response->assertStatus(400);
    }
}
