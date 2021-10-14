<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\RoleController
 */
class RoleControllerTest extends TestCase
{
    use AdditionalAssertions;
    use RefreshDatabase;
    use WithFaker;

    public $user;

    public function setUp(): void
    {
        parent::setUp();
        $this->user = User::factory()->create();
        Auth::login($this->user);
    }

    /**
     * @test
     */
    public function index_displays_view()
    {
        $roles = Role::factory()->count(3)->create();

        $response = $this->get(route('role.index'));

        $response->assertOk();
        $response->assertViewIs('role.index');
        $response->assertViewHas('roles');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('role.create'));

        $response->assertOk();
        $response->assertViewIs('role.create');
    }


    /**
     * @test
     */
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\RoleController::class,
            'store',
            \App\Http\Requests\RoleStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $type = $this->faker->word;

        $response = $this->post(route('role.store'), [
            'name' => $name,
            'type' => $type,
        ]);

        $roles = Role::query()
            ->where('name', $name)
            ->where('type', $type)
            ->get();
        $this->assertCount(1, $roles);
        $role = $roles->first();

        $response->assertRedirect(route('role.index'));
        $response->assertSessionHas('role.id', $role->id);
    }


    /**
     * @test
     */
    public function show_displays_view()
    {
        $role = Role::factory()->create();

        $response = $this->get(route('role.show', $role));

        $response->assertOk();
        $response->assertViewIs('role.show');
        $response->assertViewHas('role');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $role = Role::factory()->create();

        $response = $this->get(route('role.edit', $role));

        $response->assertOk();
        $response->assertViewIs('role.edit');
        $response->assertViewHas('role');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\RoleController::class,
            'update',
            \App\Http\Requests\RoleUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $role = Role::factory()->create();
        $name = $this->faker->name;
        $type = $this->faker->word;

        $response = $this->put(route('role.update', $role), [
            'name' => $name,
            'type' => $type,
        ]);

        $role->refresh();

        $response->assertRedirect(route('role.index'));
        $response->assertSessionHas('role.id', $role->id);

        $this->assertEquals($name, $role->name);
        $this->assertEquals($type, $role->type);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $role = Role::factory()->create();

        $response = $this->delete(route('role.destroy', $role));

        $response->assertRedirect(route('role.index'));

        $this->assertDeleted($role);
    }
}
