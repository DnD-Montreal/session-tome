<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdventureStoreRequest;
use App\Http\Requests\AdventureUpdateRequest;
use App\Models\Adventure;
use Illuminate\Http\Request;

class AdventureController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $adventures = Adventure::all();

        return view('adventure.index', compact('adventures'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('adventure.create');
    }

    /**
     * @param \App\Http\Requests\AdventureStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(AdventureStoreRequest $request)
    {
        $adventure = Adventure::create($request->validated());

        $request->session()->flash('adventure.id', $adventure->id);

        return redirect()->route('adventure.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Adventure $adventure)
    {
        return view('adventure.show', compact('adventure'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Adventure $adventure)
    {
        return view('adventure.edit', compact('adventure'));
    }

    /**
     * @param \App\Http\Requests\AdventureUpdateRequest $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function update(AdventureUpdateRequest $request, Adventure $adventure)
    {
        $adventure->update($request->validated());

        $request->session()->flash('adventure.id', $adventure->id);

        return redirect()->route('adventure.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Adventure $adventure
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Adventure $adventure)
    {
        $adventure->delete();

        return redirect()->route('adventure.index');
    }
}
