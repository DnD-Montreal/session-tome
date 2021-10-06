<?php

namespace Tests\Unit\Adapters;

use App\Facades\Beyond;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\UnauthorizedException;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class BeyondTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public $fakeCharacterData;

    public $fakeUnauthorizedData;

    public function setUp(): void
    {
        parent::setUp();

        // Donte is a lvl 20 Variant Human Fighter
        $this->fakeCharacterData = file_get_contents(database_path('mocks/beyond-donte.json'));

        $this->fakeUnauthorizedData = file_get_contents(database_path('mocks/beyond-unauthorized.json'));
    }

    /**
     * Attempts to create a character from the Mocked API
     *
     * @test
     */
    public function check_a_character_can_be_hydrated()
    {

        // Mock the response from dnd beyond
        Http::fake([
           'dndbeyond.com/*' => Http::response($this->fakeCharacterData, 200)
        ]);

        $character = Beyond::getCharacter("https://www.dndbeyond.com/profile/UserName/characters/1234567");

        $this->assertEquals("Donte Greyson", $character->name);
        $this->assertEquals("Variant Human", $character->race);
        $this->assertEquals("Fighter", $character->class);
        $this->assertEquals(20, $character->level);
    }

    /**
     * Check that the appropriate exceptions are thrown when characters are private
     *
     * @test
     */
    public function a_private_character_throws_a_403_exception()
    {
        // Mock the response from dnd beyond
        Http::fake([
            'dndbeyond.com/*' => Http::response($this->fakeUnauthorizedData, 403)
        ]);

        $this->expectException(UnauthorizedException::class);
        Beyond::getCharacter("https://www.dndbeyond.com/profile/UserName/characters/1234567");
    }

    /**
     *
     * @test
     */
    public function characters_are_cached_when_accessed()
    {
        // Mock the response from dnd beyond
        Http::fake([
            'dndbeyond.com/*' => Http::response($this->fakeCharacterData, 200)
        ]);

        $character = Beyond::getCharacter("https://www.dndbeyond.com/profile/UserName/characters/1234567");
        // accessing a second time should pull the character from the cache
        $cacheCharacter = Beyond::getCharacter("https://www.dndbeyond.com/profile/UserName/characters/1234567");

        $this->assertTrue(Cache::has('character.1234567'));
        $this->assertEquals($character->name, $cacheCharacter->name);
        $this->assertEquals($character->race, $cacheCharacter->race);
        $this->assertEquals($character->class, $cacheCharacter->class);
        $this->assertEquals($character->level, $cacheCharacter->level);
    }
}
