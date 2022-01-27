<?php

namespace App\Http\Middleware;

use App\Models\User;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    protected function redirectTo($request)
    {
        if (! $request->expectsJson()) {
            Inertia::share('unauthenticated', __('auth.unauthenticated'));
            return "/";
        }
    }

    /**
     * Determine if the user is logged in to any of the given guards.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  array  $guards
     * @return void
     *
     * @throws \Illuminate\Auth\AuthenticationException
     */
    protected function authenticate($request, array $guards)
    {
        // TODO: remove this after release 3...
        if ($request->bearerToken() == config('app.key') && App::environment('load')) {
            $user = User::firstOrCreate([
                'name' => "Locust",
                'email' => "load@test.com",
                'password' => "DOESNTMATTER"
            ]);
            Auth::login($user);
        }

        parent::authenticate($request, $guards);
    }
}
