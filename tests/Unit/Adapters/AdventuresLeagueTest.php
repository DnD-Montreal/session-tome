<?php

namespace Tests\Unit\Adapters;

use App\Exceptions\ImportException;
use App\Facades\AdventuresLeague;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class AdventuresLeagueTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    protected function setUp(): void
    {
        parent::setUp();
        $user = User::factory()->create();
        Auth::login($user);
    }

    /**
     * Attempts to create a character from the Mocked API
     *
     * @test
     */
    public function check_a_character_can_be_hydrated()
    {
        $character = AdventuresLeague::getCharacter(database_path('mocks/grod.csv'));

        $this->assertEquals('Grod', $character->name);
        $this->assertEquals('Half orc', $character->race);
        $this->assertEquals('Fighter', $character->class);
        $this->assertEquals(1, $character->level);
    }

    /**
     * @test
     */
    public function check_character_hydration_fails_if_bad_file()
    {
        $this->expectException(ImportException::class);
        $character = AdventuresLeague::getCharacter(database_path('mocks/grod-bad.csv'));
        $this->assertNull($character);
    }
}
