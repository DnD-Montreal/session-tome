<?php

namespace Tests\Feature\Http\Controllers;

use App\Facades\Beyond;
use App\Models\Character;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class BeyondImportControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_user_can_import_a_beyond_character()
    {
        $user = User::factory()->create();
        $data = [
            'user_id' => $user->id,
            'name' => $this->faker->name(),
            'race' => $this->faker->word(),
            'class' => $this->faker->word(),
            'level' => $this->faker->numberBetween(1, 20),
            'character_sheet' => $this->faker->url(),
            'faction' => $this->faker->randomElement(Character::FACTIONS),
        ];

        $character = new Character($data);

        Beyond::shouldReceive('getCharacter')
            ->once()
            ->andReturn($character);

        $response = $this
            ->actingAs($user)
            ->post('/beyond-import', ['beyond_link' => "https://www.dndbeyond.com/characters/5441197"]);

        $response->assertOk();
        $content = $response->getOriginalContent()['data'];
        $this->assertCount($data['level'], $content->entries);
    }
}
