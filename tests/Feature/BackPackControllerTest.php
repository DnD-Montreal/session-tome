<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Adventure;
use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Models\Event;
use App\Models\Item;
use App\Models\League;
use App\Models\Rating;
use App\Models\Role;
use App\Models\Session;
use App\Models\Trade;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

class BackPackControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        $siteRole = Role::create(['name' => "test site admin", 'type' => Role::SITE_ADMIN]);
        $this->user->roles()->attach($siteRole);
        Auth::login($this->user);
    }

    public function createLeagueAdmin()
    {
        $leagueAdmin = User::factory()->create();
        $siteRole = Role::create(['name' => "League Admin", 'type' => Role::LEAGUE_ADMIN]);
        $leagueAdmin->roles()->attach($siteRole);
        Auth::login($leagueAdmin);
    }

    /**
     * @test
     */
    public function test_admin_user_has_access()
    {
        $response = $this->get(('/admin/dashboard'));
        $response->assertOk();
    }

    /**
     * @test
     */
    public function test_league_admin_user_has_access()
    {
        $leagueAdmin = User::factory()->create();
        $siteRole = Role::create(['name' => "League Admin", 'type' => Role::LEAGUE_ADMIN]);
        $leagueAdmin->roles()->attach($siteRole);
        $response = $this->actingAs($leagueAdmin)->get(('/admin/dashboard'));
        $response->assertOk();
    }

    /**
     * @test
     */
    public function test_user_does_not_have_access()
    {
        $nonAdmin = User::factory()->create();
        $response = $this->actingAs($nonAdmin)->get(('/admin/dashboard'));
        $this->assertEquals(302, $response->status());
    }

    /**
     * @test
     */
    public function test_backpack_crud_actions()
    {
        $models = ['adventure', 'campaign', 'character', 'entry', 'event', 'league', 'rating', 'role', 'session', 'trade', 'user'];
        $classes = [Adventure::class, Campaign::class, Character::class, Entry::class, Event::class, League::class, Rating::class, Role::class, Session::class, Trade::class, User::class];

        for ($i = 0; $i < count($models); $i++) {
            $object = $classes[$i]::factory()->create();
            $id = $object->id;

            // model index is accessible
            $response = $this->get("/admin/$models[$i]");
            $response->assertOk();

            // model data is readable
            $response = $this->get("/admin/$models[$i]/$id/show");
            $response->assertOk();
        }
    }

    /**
     * @test
     */
    public function test_backpack_crud_actions_league_admin_access_denied()
    {
        $this->createLeagueAdmin();

        $models = ['adventure', 'campaign', 'character', 'entry', 'league', 'rating', 'role', 'trade', 'user'];
        $classes = [Adventure::class, Campaign::class, Character::class, Entry::class, League::class, Rating::class, Role::class, Trade::class, User::class];

        for ($i = 0; $i < count($models); $i++) {
            $object = $classes[$i]::factory()->create();
            $id = $object->id;

            // model index is not accessible
            $response = $this->get("/admin/$models[$i]");
            $response->assertStatus(403);

            // model data is not readable
            $response = $this->get("/admin/$models[$i]/$id/show");
            $response->assertStatus(403);
        }
    }

    /**
     * @test
     */
    public function test_backpack_crud_actions_league_admin_accessible()
    {
        $this->createLeagueAdmin();

        $models = ['event','session'];
        $classes = [Event::class, Session::class];

        for ($i = 0; $i < count($models); $i++) {
            $object = $classes[$i]::factory()->create();
            $id = $object->id;

            // model index is accessible
            $response = $this->get("/admin/$models[$i]");
            $response->assertOk();

            // model data is readable
            $response = $this->get("/admin/$models[$i]/$id/show");
            $response->assertOk();
        }
    }
}
