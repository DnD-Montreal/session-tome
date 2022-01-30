<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Character;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\App;


use Laravel\Sanctum\HasApiTokens;

class LocustAuthController extends Controller
{
    use HasApiTokens;

    public function getToken(Request $request)
    {
        if ($request->bearerToken() == config('app.key') && App::environment('load')) {
            $user = User::where('password', 'DOESNTMATTER')->get();
            $token = $user->first()->createToken('bearer')->plainTextToken;

            return [
                'token' => $token
            ];
        }
    }

    public function deleteCharacters()
    {
        if (App::environment('load')) {
            $user = User::where('password', 'DOESNTMATTER')->get();

            if ($user->first()->email == 'load@test.com') {
                $characters = Character::where('user_id', $user->first()->id);
                $characters->delete();
            }
        }
    }
}
