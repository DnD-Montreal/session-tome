<?php

namespace Tests\Unit\Models;

use App\Models\User;
use App\Models\Role;
use App\Models\League;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;
use Webmozart\Assert\Assert;

class UserTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * A basic unit test example.
     *
     * @return void
     */
    public function test_example()
    {
        $this->assertTrue(true);
    }

    public function test_user_is_admin_returns_true_if_admin()
    {
        $testUser = User::factory()->create();

        $testAdminRole = Role::create([
            'name' => "test admin",
            'type' => Role::SITE_ADMIN
        ]);

        $testUser->roles()->attach($testAdminRole);

        $this->assertTrue($testUser->isSiteAdmin());
    }

    public function test_user_is_admin_returns_false_if_not_admin()
    {
        $testUser = User::factory()->create();

        $this->assertFalse($testUser->isSiteAdmin());
    }

    public function test_user_has_league_role()
    {
        $testUser = User::factory()->create();
        $testLeague = League::factory()->create();
        $testRole = Role::create([
            'name' => "test admin",
            'type' => Role::LEAGUE_ADMIN
        ]);

        $testRole->league()->associate($testLeague)->save();

        $testUser->roles()->attach($testRole);

        $this->AssertTrue($testUser->isLeagueAdmin($testLeague->id));
    }
}
