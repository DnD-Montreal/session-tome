<?php

namespace App\Http\Controllers;

use App\Http\Requests\RatingStoreRequest;
use App\Http\Requests\RatingUpdateRequest;
use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $ratings = Rating::all();

        return view('rating.index', compact('ratings'));
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
