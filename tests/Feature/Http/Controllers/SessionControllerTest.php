<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Adventure;
use App\Models\Event;
use App\Models\Session;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\SessionController
 */
class SessionControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    /**
     * @test
     */
    public function index_displays_view()
    {
        $sessions = Session::factory()->count(3)->create();

        $response = $this->get(route('session.index'));

        $response->assertOk();
        $response->assertViewIs('session.index');
        $response->assertViewHas('sessions');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('session.create'));

        $response->assertOk();
        $response->assertViewIs('session.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SessionController::class,
            'store',
            \App\Http\Requests\SessionStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $event = Event::factory()->create();
        $adventure = Adventure::factory()->create();
        $dungeon_master = User::factory()->create();
        $table = $this->faker->word;
        $start_time = $this->faker->dateTime();

        $response = $this->post(route('session.store'), [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeon_master_id' => $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);

        $sessions = Session::query()
            ->where('event_id', $event->id)
            ->where('adventure_id', $adventure->id)
            ->where('dungeon_master_id', $dungeon_master->id)
            ->where('table', $table)
            ->where('start_time', $start_time)
            ->get();
        $this->assertCount(1, $sessions);
        $session = $sessions->first();

        $response->assertRedirect(route('session.index'));
        $response->assertSessionHas('session.id', $session->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $session = Session::factory()->create();

        $response = $this->get(route('session.show', $session));

        $response->assertOk();
        $response->assertViewIs('session.show');
        $response->assertViewHas('session');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $session = Session::factory()->create();

        $response = $this->get(route('session.edit', $session));

        $response->assertOk();
        $response->assertViewIs('session.edit');
        $response->assertViewHas('session');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\SessionController::class,
            'update',
            \App\Http\Requests\SessionUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $session = Session::factory()->create();
        $event = Event::factory()->create();
        $adventure = Adventure::factory()->create();
        $dungeon_master = User::factory()->create();
        $table = $this->faker->word;
        $start_time = $this->faker->dateTime();

        $response = $this->put(route('session.update', $session), [
            'event_id' => $event->id,
            'adventure_id' => $adventure->id,
            'dungeon_master_id' => $dungeon_master->id,
            'table' => $table,
            'start_time' => $start_time,
        ]);

        $session->refresh();

        $response->assertRedirect(route('session.index'));
        $response->assertSessionHas('session.id', $session->id);

        $this->assertEquals($event->id, $session->event_id);
        $this->assertEquals($adventure->id, $session->adventure_id);
        $this->assertEquals($dungeon_master->id, $session->dungeon_master_id);
        $this->assertEquals($table, $session->table);
        $this->assertEquals($start_time, $session->start_time);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $session = Session::factory()->create();

        $response = $this->delete(route('session.destroy', $session));

        $response->assertRedirect(route('session.index'));

        $this->assertDeleted($session);
    }
}
