<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
    public function store_uses_form_request_validation()
    {
        $this->assertActionUsesFormRequest(
            \App\Http\Controllers\UserController::class,
            'store',
            \App\Http\Requests\UserStoreRequest::class
        );
    }

    /**
     * @test
     */
    public function store_saves_and_redirects()
    {
        $name = $this->faker->name;
        $email = $this->faker->safeEmail;
        $email_verified_at = $this->faker->dateTime();
        $password = $this->faker->password;
        $remember_token = $this->faker->word;
        $created_at = $this->faker->dateTime();
        $updated_at = $this->faker->dateTime();

        $response = $this->post(route('user.store'), [
            'name' => $name,
            'email' => $email,
            'email_verified_at' => $email_verified_at,
            'password' => $password,
            'remember_token' => $remember_token,
            'created_at' => $created_at,
            'updated_at' => $updated_at,
        ]);

        $users = User::query()
            ->where('name', $name)
            ->where('email', $email)
            ->where('email_verified_at', $email_verified_at)
            ->where('password', $password)
            ->where('remember_token', $remember_token)
            ->where('created_at', $created_at)
            ->where('updated_at', $updated_at)
            ->get();
        $this->assertCount(1, $users);
        $user = $users->first();

        $response->assertRedirect(route('user.index'));
        $response->assertSessionHas('user.id', $user->id);
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
        $email_verified_at = $this->faker->dateTime();
        $password = $this->faker->password;
        $remember_token = $this->faker->word;
        $created_at = $this->faker->dateTime();
        $updated_at = $this->faker->dateTime();

        $response = $this->put(route('user.update', $user), [
            'name' => $name,
            'email' => $email,
            'email_verified_at' => $email_verified_at,
            'password' => $password,
            'remember_token' => $remember_token,
            'created_at' => $created_at,
            'updated_at' => $updated_at,
        ]);

        $user->refresh();

        $response->assertRedirect(route('user.index'));
        $response->assertSessionHas('user.id', $user->id);

        $this->assertEquals($name, $user->name);
        $this->assertEquals($email, $user->email);
        $this->assertEquals($email_verified_at, $user->email_verified_at);
        $this->assertEquals($password, $user->password);
        $this->assertEquals($remember_token, $user->remember_token);
        $this->assertEquals($created_at, $user->created_at);
        $this->assertEquals($updated_at, $user->updated_at);
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
