<?php

namespace App\Http\Controllers;

use App\Http\Requests\LeagueStoreRequest;
use App\Http\Requests\LeagueUpdateRequest;
use App\Models\League;
use Illuminate\Http\Request;

class LeagueController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $leagues = League::all();

        return view('league.index', compact('leagues'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('league.create');
    }

    /**
     * @param \App\Http\Requests\LeagueStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(LeagueStoreRequest $request)
    {
        $league = League::create($request->validated());

        $request->session()->flash('league.id', $league->id);

        return redirect()->route('league.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\League $league
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, League $league)
    {
        return view('league.show', compact('league'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\League $league
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, League $league)
    {
        return view('league.edit', compact('league'));
    }

    /**
     * @param \App\Http\Requests\LeagueUpdateRequest $request
     * @param \App\Models\League $league
     * @return \Illuminate\Http\Response
     */
    public function update(LeagueUpdateRequest $request, League $league)
    {
        $league->update($request->validated());

        $request->session()->flash('league.id', $league->id);

        return redirect()->route('league.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\League $league
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, League $league)
    {
        $league->delete();

        return redirect()->route('league.index');
    }
}
