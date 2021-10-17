<?php

namespace Tests\Unit\Models;

use App\Models\User;
use App\Models\Item;
use App\Models\Character;
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

        $testUser->roles()->attach($testRole, ['league_id' => $testLeague->id]);

        $this->AssertTrue($testUser->isLeagueAdmin($testLeague->id));
        $this->AssertFalse(User::factory()->create()->isLeagueAdmin($testLeague->id));
    }

    public function test_user_has_any_role_returns_false()
    {
        $testUser = User::factory()->create();
        $testRole = Role::create([
            'name' => "test admin",
            'type' => Role::SITE_ADMIN
        ]);


        $this->AssertFalse($testUser->hasAnyRole());
    }
    public function test_user_has_any_role_returns_true()
    {
        $testUser = User::factory()->create();
        $testRole = Role::create([
            'name' => "test admin",
            'type' => Role::SITE_ADMIN
        ]);

        $testUser->roles()->attach($testRole, ['league_id' => 0]);

        $this->AssertTrue($testUser->hasAnyRole());
    }

    public function user_has_items()
    {
        $user = User::factory()->create();
        $item = Item::factory(3)->create();
        $character = Character::factory()->create();

        $character->items()->savemany($item);
        $user->characters()->save($character);

        $user->save();
        $character->save();
        $items = $user->items()->get();

        $user->refresh();
        $character->refresh();

        $this->assertEquals($items->count(), 3);
    }
}
