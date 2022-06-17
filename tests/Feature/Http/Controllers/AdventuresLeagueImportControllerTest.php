<?php

namespace Tests\Feature\Http\Controllers;

use App\Facades\Beyond;
use App\Models\Character;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Inertia\Testing\Assert;
use JMac\Testing\Traits\AdditionalAssertions;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Tests\TestCase;

class AdventuresLeagueImportControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public $donteName;
    public $donteClass;
    public $donteRace;

    public function setUp(): void
    {
        parent::setUp();
        $this->donteClass = "Fighter";
        $this->donteName = "Donte Greysor";
        $this->donteRace = "V. Human";
    }


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

        $character = Character::where('name', $this->donteName)
            ->where('race', $this->donteRace)
            ->where('class', $this->donteClass)
            ->first();

        $firstItem = $character->items()->first();
        $response->assertRedirect(route('character.show', ['character' => $character]));
        $response->assertStatus(302);
        $this->assertEquals($this->donteName, $character->name);
        $this->assertEquals($this->donteRace, $character->race);
        $this->assertEquals($this->donteClass, $character->class);
        $this->assertEquals(20, $character->level);
        $this->assertEquals("Shield +1", $firstItem->name);
        $this->assertCount(18, $character->items);
    }

    /**
     * @test
     */
    public function first_line_item_creates_entry()
    {
        $user = User::factory()->create();
        $csv = new UploadedFile(database_path('mocks/dante-bad.csv'), "dante.csv");
        $response = $this->actingAs($user)->post('/adventures-league-import', ['logs' => $csv]);

        $character = Character::where('name', $this->donteName)
            ->where('race', $this->donteRace)
            ->where('class', $this->donteClass)
            ->first();

        $firstItem = $character->items()->first();
        $response->assertRedirect(route('character.show', ['character' => $character]));
        $response->assertStatus(302);
        $this->assertEquals($this->donteName, $character->name);
        $this->assertEquals($this->donteRace, $character->race);
        $this->assertEquals($this->donteClass, $character->class);
        $this->assertEquals(20, $character->level);
        $this->assertEquals("Shield +1", $firstItem->name);
        $this->assertCount(19, $character->items);
    }

    /**
     * @test
     */
    public function response_failure_if_invalid_file_format()
    {
        $user = User::factory()->create();
        $csv = new UploadedFile(database_path('mocks/grod-bad.csv'), "grod-bad.csv");
        $response = $this->actingAs($user)->post('/adventures-league-import', ['logs' => $csv]);

        $this->assertNotNull($response->exception);
        $this->assertEquals("Adventure's League Log File Error: Export File Format Changed", $response->exception->getMessage());
        $this->assertEquals(400, $response->exception->getCode());
        $response->assertRedirect();
    }

    /**
     * @test
     */
    public function response_failure_if_missing_file()
    {
        $user = User::factory()->create();
        $response = $this->actingAs($user)->post('/adventures-league-import');
        $this->assertNotNull($response->exception);
        $this->assertEquals("Adventure's League Log File Error", $response->exception->getMessage());
        $this->assertEquals(400, $response->exception->getCode());
        $response->assertRedirect();
    }
}
