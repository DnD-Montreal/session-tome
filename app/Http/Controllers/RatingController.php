<?php

namespace App\Http\Controllers;

use App\Http\Requests\RatingStoreRequest;
use App\Http\Requests\RatingUpdateRequest;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;

class RatingController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $users = User::with('ratings');

        if ($searchName = $request->get('name')) {
            $users = $users->where('name', 'like', "%{$searchName}%");
        }

        if ($searchLanguage = $request->get('search_language')) {
            $users = $users->whereHas('sessions', function (Builder $q) use ($searchLanguage) {
                $q->whereIn('language', explode(",", $searchLanguage));
            });
        }

        if ($request->get('from_event')) {
            $users = $users->with(['ratings' => function ($q) {
                $q->has('entry.event');
            } ]);
        }

        if ($searchCategory = $request->get('search_category')) {
            $users = $users->get()->sortByDesc(function ($user) use ($searchCategory) {
                return $user->total_ratings[$searchCategory];
            });
        } else {
            $users = $users->get();
        }

        return Inertia::render('Rating/Rating', compact('users'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('rating.create');
    }

    /**
     * @param \App\Http\Requests\RatingStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(RatingStoreRequest $request)
    {
        $rating = Rating::create($request->validated());

        $request->session()->flash('rating.id', $rating->id);

        return redirect()->route('rating.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Rating $rating)
    {
        return view('rating.show', compact('rating'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Rating $rating)
    {
        return view('rating.edit', compact('rating'));
    }

    /**
     * @param \App\Http\Requests\RatingUpdateRequest $request
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function update(RatingUpdateRequest $request, Rating $rating)
    {
        $rating->update($request->validated());

        $request->session()->flash('rating.id', $rating->id);

        return redirect()->route('rating.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Rating $rating
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Rating $rating)
    {
        $rating->delete();

        return redirect()->route('rating.index');
    }
}
