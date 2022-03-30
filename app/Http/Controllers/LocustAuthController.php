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

    public function deleteCharacter()
    {
        if (App::environment('load')) {
            $user = User::where('password', 'DOESNTMATTER')->get()->first();

            if ($user->email == 'load@test.com') {
                $characters = Character::where('user_id', $user->id);
                $characters->first()->delete();
            }
        }
    }

    public function cleanUp()
    {
        if (App::environment('load')) {
            $user = User::where('password', 'DOESNTMATTER')->get()->first();

            if ($user->email == 'load@test.com') {
                $characters = Character::where('user_id', $user->id);
                $characters->delete();

                $user->Tokens()->delete();
            }
        }
    }
}
