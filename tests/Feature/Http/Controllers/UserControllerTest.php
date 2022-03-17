<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Testing\Assert;
use JMac\Testing\Traits\AdditionalAssertions;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
    public function edit_displays_view()
    {
        $response = $this->get(route('user.edit', $this->user));

        $response->assertOk();
        $response->assertInertia(
            fn (Assert $page) => $page
                ->component("Profile/Profile")
                ->has('user')
        );
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
        $user = $this->user;
        $otherUser = User::factory()->create();
        $name = $this->faker->name;
        $email = $this->faker->safeEmail;
        $password = "aVerySecurePasssword000";
        $language = $this->faker->randomElement(['en', 'fr']);

        $response = $this->actingAs($user)->put(route('user.update', $otherUser), [
            'name' => $name,
            'email' => $email,
            'language' => $language,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $response->assertForbidden();

        $response = $this->actingAs($user)->put(route('user.update', $user), [
            'name' => $name,
            'email' => $email,
            'language' => $language,
            'password' => $password,
            'password_confirmation' => $password,
        ]);

        $user->refresh();

        $response->assertRedirect();

        $this->assertEquals($name, $user->name);
        $this->assertEquals($email, $user->email);
        $this->assertTrue(Hash::check($password, $user->password));
        $this->assertEquals($language, $user->language);
    }

    /**
     * @test
     */
    public function destroy_deletes_and_redirects()
    {
        $otherUser = User::factory()->create();

        $response = $this->delete(route('user.destroy', $otherUser));

        $response->assertForbidden();

        $response = $this->delete(route('user.destroy', $this->user));

        $response->assertRedirect();
        $this->assertSoftDeleted($this->user);
    }
}
