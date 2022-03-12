<?php

namespace Tests\Unit\Models;

use App\Models\Campaign;
use App\Models\User;
use App\Models\Item;
use App\Models\Character;
use App\Models\Role;
use App\Models\League;
use App\Models\Rating;
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

    public function user_is_admin_returns_true_if_admin()
    {
        $testUser = User::factory()->create();

        $testAdminRole = Role::create([
            'name' => "test admin",
            'type' => Role::SITE_ADMIN
        ]);

        $testUser->roles()->attach($testAdminRole);

        $this->assertTrue($testUser->isSiteAdmin());
    }

    /**
     * @test
     */
    public function user_is_admin_returns_false_if_not_admin()
    {
        $testUser = User::factory()->create();

        $this->assertFalse($testUser->isSiteAdmin());
    }

    /**
     * @test
     */
    public function user_has_league_role()
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

    /**
     * @test
     */
    public function user_has_any_role_returns_false()
    {
        $testUser = User::factory()->create();
        $testRole = Role::create([
            'name' => "test admin",
            'type' => Role::SITE_ADMIN
        ]);


        $this->AssertFalse($testUser->hasAnyRole());
    }

    /**
     * @test
     */
    public function user_has_any_role_returns_true()
    {
        $testUser = User::factory()->create();
        $testRole = Role::create([
            'name' => "test admin",
            'type' => Role::SITE_ADMIN
        ]);

        $testUser->roles()->attach($testRole, ['league_id' => 0]);

        $this->AssertTrue($testUser->hasAnyRole());
    }

    /**
     * @test
     */
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

        $this->assertEquals($items->count(), 3);
    }

    /**
     * @test
     */
    public function can_get_total_ratings()
    {
        $user = User::factory()->create();
        $rating1 = Rating::factory()->create(['user_id' => $user->id, 'categories' => 16]);
        $rating2 = Rating::factory()->create(['user_id' => $user->id, 'categories' => 20]);

        $actualTotal = $user->getTotalRatingsAttribute();

        $expectedTotal = collect([
            Rating::CREATIVE_LABEL => 2,
            Rating::FLEXIBLE_LABEL => 0,
            Rating::FRIENDLY_LABEL => 1,
            Rating::HELPFUL_LABEL => 0,
            Rating::PREPARED_LABEL => 0,
        ]);

        $this->assertEquals($expectedTotal, $actualTotal);
    }

    /**
     * @test
     */
    public function user_has_authored_items()
    {
        $user = User::factory()->create();
        $items = Item::factory(3)->create([
            'author_id' => $user->id
        ]);

        $this->assertCount(3, $user->authored_items);
        $this->assertEquals($items->fresh(), $user->authored_items);
    }

    /**
     * @test
     */
    public function user_can_have_campaigns()
    {
        $user = User::factory()->create();
        $campaign = Campaign::factory()->create();
        $user->campaigns()->attach($campaign, ['is_dm' => true]);

        $this->assertCount(1, $user->campaigns);
        $this->assertEquals(1, $user->campaigns[0]->pivot->is_dm);
    }

    /**
     * @test
     */
    public function user_has_roles_list()
    {
        $role = Role::factory()->create();
        $leagues = League::factory(3)->create();
        $user = User::factory()->create();
        $user->roles()->attach($role, ['league_id'  => $leagues[0]->id]);
        $user->roles()->attach($role, ['league_id'  => $leagues[1]->id]);
        $user->roles()->attach($role, ['league_id'  => $leagues[2]->id]);

        $user->fresh();
        $list = json_decode($user->roles_list, true);

        $this->assertCount(3, $list);
        $this->assertEquals($leagues[0]->id, $list[0]['league_id']);
        $this->assertEquals($leagues[1]->id, $list[1]['league_id']);
        $this->assertEquals($leagues[2]->id, $list[2]['league_id']);
    }
}
