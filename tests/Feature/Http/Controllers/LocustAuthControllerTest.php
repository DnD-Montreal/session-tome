<?php

namespace Http\Controllers;

use Tests\TestCase;

class LocustAuthControllerTest extends TestCase
{
    /**
     * @test
     */
    public function test_get_token()
    {
        $token = config('app.key');

        app()->detectEnvironment(function () {
            return 'load';
        });

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->get(route('character.index'));
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->get('api/locust');

        $response->assertStatus(200);
    }

    /**
     * @test
     */
    public function test_delete_characters_with_locust_api_key()
    {
        $token = config('app.key');

        app()->detectEnvironment(function () {
            return 'load';
        });

        $this->withHeaders(['Authorization' => 'Bearer '.$token])->get(route('character.index'));
        $response = $this->withHeaders(['Authorization' => 'Bearer '.$token])->delete('api/locust');

        $response->assertStatus(200);
    }
}
