<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Inertia\Response
     */
    public function edit(Request $request, User $user)
    {
        if ($user->id != Auth::id() || !$user->isSiteAdmin()) {
            abort(403);
        }

        return Inertia::render('Profile', compact('user'));
    }

    /**
     * @param \App\Http\Requests\UserUpdateRequest $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(UserUpdateRequest $request, User $user)
    {
        $user->update($request->safe(['name', 'email', 'language']));

        // Handle password changes
        if ($newPassword = $request->safe(['password'])) {
            $newPassword['password'] = Hash::make($newPassword['password']);
            $user->update($newPassword);
            // if the user updated their password, then re-auth them because their session will be invalidated.
            Auth::login($user);
        }

        $request->session()->flash('user.id', $user->id);

        return redirect()->back();
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\User $user
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, User $user)
    {
        $user->delete();
        Auth::logout();

        return redirect()->route('homepage');
    }
}
