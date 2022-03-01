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
    public String $adminEvent = "/admin/event";
    public String $adminDashboard = "/admin/dashboard";
    public String $adminSession = "/admin/session";
    public function createLeagueAdmin()
    {
        $this->user = User::factory()->create();
        $league = League::factory()->create();
        $siteRole = Role::create(['name' => "League Admin", 'type' => Role::LEAGUE_ADMIN, 'league_id' => $league->id]);
        $this->user->roles()->attach($siteRole, ['league_id' => $league->id]);
        Auth::login($this->user);
    }

    public function createLeagueAdminWithNoLeagueId()
    {
        $this->user = User::factory()->create();
        $siteRole = Role::create(['name' => "League Admin", 'type' => Role::LEAGUE_ADMIN]);
        $this->user->roles()->attach($siteRole);
        Auth::login($this->user);
    }

    public function createSiteAdmin()
    {
        $this->user = User::factory()->create();
        $siteRole = Role::create(['name' => "test site admin", 'type' => Role::SITE_ADMIN]);
        $this->user->roles()->attach($siteRole);
        Auth::login($this->user);
    }

    public function createNonAdmin()
    {
        $this->user = User::factory()->create();
        Auth::login($this->user);
    }

    /**
     * @test
     */
    public function test_admin_user_has_access()
    {
        $this->createSiteAdmin();
        $response = $this->get(($this->adminDashboard));
        $response->assertOk();
    }

    /**
     * @test
     */
    public function test_league_admin_user_has_access()
    {
        $this->createLeagueAdmin();
        $response = $this->get(($this->adminDashboard));
        $response->assertOk();
    }

    /**
     * @test
     */
    public function test_league_admin_user_with_no_id_has_no_access()
    {
        $this->createLeagueAdminWithNoLeagueId();
        $response = $this->get(($this->adminDashboard));
        $response->assertRedirect();
    }


    /**
     * @test
     */
    public function test_user_does_not_have_access()
    {
        $this->createNonAdmin();
        $response = $this->get(($this->adminDashboard));
        $response->assertRedirect();
    }

    /**
     * @test
     */
    public function test_admin_has_access_to_crud_actions()
    {
        $this->createSiteAdmin();

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
    public function test_league_admin_access_denied_to_crud_actions()
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
    public function test_league_admin_with_no_league_id_access_denied_to_crud_actions()
    {
        $this->createLeagueAdminWithNoLeagueId();

        $models = ['adventure', 'campaign', 'character', 'entry', 'league', 'rating', 'role', 'trade', 'user'];
        $classes = [Adventure::class, Campaign::class, Character::class, Entry::class, League::class, Rating::class, Role::class, Trade::class, User::class];

        for ($i = 0; $i < count($models); $i++) {
            $object = $classes[$i]::factory()->create();
            $id = $object->id;

            // model index is not accessible
            $response = $this->get("/admin/$models[$i]");
            $response->assertRedirect();

            // model data is not readable
            $response = $this->get("/admin/$models[$i]/$id/show");
            $response->assertRedirect();
        }
    }

    /**
     * @test
     */
    public function test_league_admin_has_access_to_crud_actions_for_event_and_sessions()
    {
        $this->createLeagueAdmin();

        $models = ['event', 'session'];
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

    /**
     * @test
     */
    public function test_league_admin_not_authorized_to_create_a_session_from_a_different_league()
    {
        $this->createLeagueAdmin();

        $event = Event::factory()->create();
        $adventure = Adventure::factory()->create();
        $dungeon_master = User::factory()->create();
        $table = $this->faker->word;
        $start_time = $this->faker->dateTime();

        $response = $this->post($this->adminSession, [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeonMaster' => $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);

        $response->assertStatus(403);

        $this->assertDatabaseMissing('sessions', [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeon_master_id'=> $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);
    }

    /**
     * @test
     */
    public function test_league_admin_not_authorized_to_create_event_for_different_league()
    {
        $this->createLeagueAdmin();

        $league = League::factory()->create();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->post($this->adminEvent, [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $response->assertStatus(403);

        $this->assertDatabasemissing('events', [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);
    }

    /**
     * @test
     */
    public function test_site_admin_authorized_to_create_event()
    {
        $this->createSiteAdmin();

        $league = League::factory()->create();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->post($this->adminEvent, [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);
        $response->assertRedirect();

        $this->assertDatabaseHas('events', [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);
    }

    /**
     * @test
     */
    public function test_site_admin_authorized_to_create_session()
    {
        $this->createSiteAdmin();
        $event = Event::factory()->create();
        $adventure = Adventure::factory()->create();
        $dungeon_master = User::factory()->create();
        $table = $this->faker->word;
        $start_time = $this->faker->dateTime();

        $response = $this->post($this->adminSession, [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeonMaster'=> $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('sessions', [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeon_master_id'=> $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);
    }


    /**
     * @test
     */
    public function test_league_admin_authorized_to_create_session()
    {
        $this->createLeagueAdmin();

        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;
        $event = Event::create([
            'league_id' => $this->user->roles()->pluck('league_id')->first(),
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $adventure = Adventure::factory()->create();
        $dungeon_master = User::factory()->create();
        $table = $this->faker->word;
        $start_time = $this->faker->dateTime();

        $response = $this->post($this->adminSession, [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeonMaster'=> $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('sessions', [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeon_master_id'=> $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);
    }

    /**
     * @test
     */
    public function test_league_admin_authorized_to_create_event()
    {
        $this->createLeagueAdmin();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->post($this->adminEvent, [
            'league_id' => $this->user->roles()->pluck('league_id')->first(),
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('events', [
            'league_id' => $this->user->roles()->pluck('league_id')->first(),
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);
    }
}
