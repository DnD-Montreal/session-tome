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
    }

    public function createLeagueAdmin()
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
        $response = $this->get(('/admin/dashboard'));
        $response->assertOk();
    }

    /**
     * @test
     */
    public function test_league_admin_user_has_access()
    {
        $this->createLeagueAdmin();
        $response = $this->get(('/admin/dashboard'));
        $response->assertOk();
    }

    /**
     * @test
     */
    public function test_user_does_not_have_access()
    {
        $this->createNonAdmin();
        $response = $this->get(('/admin/dashboard'));
        $this->assertEquals(302, $response->status());
    }

    /**
     * @test
     */
    public function test_backpack_crud_actions()
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

    /**
     * @test
     */
    public function test_backpack_not_authorized_for_league_admin_session()
    {
        $this->createLeagueAdmin();

        $event = Event::factory()->create();
        $adventure = Adventure::factory()->create();
        $dungeon_master = User::factory()->create();
        $table = $this->faker->word;
        $start_time = $this->faker->dateTime();

        $response = $this->post('/admin/session', [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeon_master_id' => $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);

        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function test_backpack_not_authorized_for_league_admin_event()
    {
        $this->createLeagueAdmin();

        $league = League::factory()->create();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->post('/admin/event', [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $response->assertStatus(403);
    }

    /**
     * @test
     */
    public function test_backpack_authorized_for_site_admin_event()
    {
        $this->createSiteAdmin();

        $league = League::factory()->create();
        $title = $this->faker->sentence(4);
        $description = $this->faker->text;
        $location = $this->faker->word;

        $response = $this->post('/admin/event', [
            'league_id' => $league->id,
            'title' => $title,
            'description' => $description,
            'location' => $location,
        ]);

        $response->assertRedirect();
    }
}
