<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use JMac\Testing\Traits\AdditionalAssertions;
use Tests\TestCase;

/**
 * @see \App\Http\Controllers\UserController
 */
class UserControllerTest extends TestCase
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
        $users = User::factory()->count(3)->create();

        $response = $this->get(route('user.index'));

        $response->assertOk();
        $response->assertViewIs('user.index');
        $response->assertViewHas('users');
    }


    /**
     * @test
     */
    public function create_displays_view()
    {
        $response = $this->get(route('user.create'));

        $response->assertOk();
        $response->assertViewIs('user.create');
    }

    /**
     * @test
     */
    public function show_displays_view()
    {
        $user = User::factory()->create();

        $response = $this->get(route('user.show', $user));

        $response->assertOk();
        $response->assertViewIs('user.show');
        $response->assertViewHas('user');
    }


    /**
     * @test
     */
    public function edit_displays_view()
    {
        $user = User::factory()->create();

        $response = $this->get(route('user.edit', $user));

        $response->assertOk();
        $response->assertViewIs('user.edit');
        $response->assertViewHas('user');
    }


    /**
     * @test
     */
    public function update_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\UserController::class,
            'update',
            \App\Http\Requests\UserUpdateRequest::class
        );
    }

    /**
     * @test
     */
    public function update_redirects()
    {
        $user = User::factory()->create();
        $name = $this->faker->name;
        $email = $this->faker->safeEmail;
        $password = $this->faker->password;

        $response = $this->put(route('user.update', $user), [
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $user->refresh();

        $response->assertRedirect(route('user.index'));
        $response->assertSessionHas('user.id', $user->id);

        $this->assertEquals($name, $user->name);
        $this->assertEquals($email, $user->email);
        $this->assertEquals($password, $user->password);
    }


    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $user = User::factory()->create();

        $response = $this->delete(route('user.destroy', $user));

        $response->assertRedirect(route('user.index'));

        $this->assertDeleted($user);
    }
}
