<?php

namespace Tests\Unit\Policies;

use App\Models\Character;
use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class CharacterPolicyTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function a_character_can_be_viewed_by_the_appropriate_users()
    {
        $character = Character::factory()->create([
            'status' => 'private'
        ]);
        $publicCharacter = Character::factory()->create([
            'status' => 'public'
        ]);
        $admin = Role::factory()->create([
            'type' => Role::SITE_ADMIN
        ]);
        $adminUser = User::factory()->create();
        $adminUser->roles()->save($admin);
        $owner = $character->user;
        $otherUser = User::factory()->create();

        $this->assertTrue($owner->can('view', $character));
        $this->assertFalse($otherUser->can('view', $character));
        $this->assertTrue($adminUser->can('view', $character));
        $this->assertTrue($otherUser->can('view', $publicCharacter));
    }
}
