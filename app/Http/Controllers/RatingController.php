<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RatingController extends Controller
{
    /**
     * @param  \Illuminate\Http\Request  $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $users = User::has('ratings')->with('ratings');

        if ($searchName = $request->get('name')) {
            $users = $users->where('name', 'like', "%{$searchName}%");
        }

        if ($searchLanguage = $request->get('search_language')) {
            $users = $users->whereHas('sessions', function (Builder $q) use ($searchLanguage) {
                $q->whereIn('language', explode(',', $searchLanguage));
            });
        }

        if ($fromEvent = (bool) $request->get('from_event')) {
            $users = $users->has('ratings.entry.event')->with(['ratings' => function ($q) {
                $q->has('entry.event');
            }]);
        }

        if ($searchCategory = $request->get('search_category', 'CREATIVE')) {
            $users = $users->get()->sortByDesc(function ($user) use ($searchCategory) {
                return $user->total_ratings[$searchCategory];
            })->values();
        } else {
            $users = $users->get();
        }

        return Inertia::render('Rating/Rating', compact('users', 'fromEvent'));
    }
}
