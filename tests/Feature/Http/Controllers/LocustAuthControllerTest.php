<?php

namespace Http\Controllers;

use App\Models\Character;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;

class LocustAuthControllerTest extends TestCase
{
    use RefreshDatabase;

    public string $bearer = 'Bearer ';
    public $token;

    public function setUp(): void
    {
        parent::setUp();
        $this->token = config('app.key');
        app()->detectEnvironment(function () {
            return 'load';
        });

        //Initial request to make the locust user from the Authenticate method in the Authenticate middleware
        $this->withHeaders(['Authorization' => $this->bearer .$this->token])->get(route('character.index'));
    }

    /**
     * @test
     */
    public function test_get_token()
    {
        $response = $this->withHeaders(['Authorization' => $this->bearer .$this->token])->get('api/locust');

        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function test_delete_character()
    {
        $user = User::first();
        Character::factory(5)->create([
            'user_id' => $user->id
        ]);

        $response = $this->withHeaders(['Authorization' => $this->bearer .$this->token])->delete('api/character');

        $response->assertStatus(200);
        $this->assertDatabaseCount('characters', 4);
    }

    /**
     * @test
     */
    public function test_cleanUp()
    {
        $user = User::first();
        Character::factory(5)->create([
            'user_id' => $user->id
        ]);

        $this->withHeaders(['Authorization' => $this->bearer .$this->token])->get('api/locust');
        $response = $this->withHeaders(['Authorization' => $this->bearer .$this->token])->delete('api/clean');

        $response->assertStatus(200);
        $this->assertDatabaseCount('characters', 0);
        $this->assertDatabaseCount('personal_access_tokens', 0);
    }
}
