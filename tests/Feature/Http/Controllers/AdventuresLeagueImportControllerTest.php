<?php

namespace Tests\Feature\Http\Controllers;

use App\Facades\Beyond;
use App\Models\Character;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Inertia\Testing\Assert;
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
    public function index_displays_view()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->get(route('adventures-league-import.index'));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
            ->component('Character/Import/CharacterImport')
        );
    }

    /**
     * @test
     */
    public function a_user_can_import_an_adventures_league_character()
    {
        $user = User::factory()->create();
        $csv = new UploadedFile(database_path('mocks/dante.csv'), "dante.csv");
        $response = $this->actingAs($user)->post('/adventures-league-import', ['logs' => $csv]);

        $character = Character::where('name', "Donte Greysor")
            ->where('race', "V. Human")
            ->where('class', "Fighter")
            ->first();

        $firstItem = $character->items()->first();
        $response->assertRedirect(route('character.show', ['character' => $character]));
        $response->assertStatus(302);
        $this->assertEquals("Donte Greysor", $character->name);
        $this->assertEquals("V. Human", $character->race);
        $this->assertEquals("Fighter", $character->class);
        $this->assertEquals(1, $character->level);
        $this->assertEquals("Shield +1", $firstItem->name);
        $this->assertCount(18, $character->items);
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
