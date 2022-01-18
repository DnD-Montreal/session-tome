<?php

namespace App\Http\Controllers;

use App\Http\Requests\CharacterStoreRequest;
use App\Http\Requests\CharacterUpdateRequest;
use App\Models\Character;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CharacterController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $sortParams = $request->validate([
            'sort_by' => "sometimes|in:name,race,class,level,faction,downtime",
            'sort_dir' => "sometimes|in:asc,desc"
        ]);

        $characters = Character::where('user_id', Auth::user()->id);

        if (isset($sortParams['sort_by'])) {
            $direction =  isset($sortParams['sort_dir']) ? $sortParams['sort_dir'] : "asc";
            $characters = $characters->orderBy($sortParams['sort_by'], $direction);
        }

        $characters = $characters->get();

        return Inertia::render('Character/Character', compact('characters'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        return Inertia::render('Character/Create/CharacterCreate');
    }

    /**
     * @param \App\Http\Requests\CharacterStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(CharacterStoreRequest $request)
    {
        $character = Auth::user()->characters()->create($request->validated());

        $request->session()->flash('character.id', $character->id);

        return redirect()->route('character.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Character $character
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Character $character)
    {
        if ($request->user()->cannot('view', $character)) {
            abort(403);
        }

        return view('character.show', compact('character'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Character $character
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Character $character)
    {
        return view('character.edit', compact('character'));
    }

    /**
     * @param \App\Http\Requests\CharacterUpdateRequest $request
     * @param \App\Models\Character $character
     * @return \Illuminate\Http\Response
     */
    public function update(CharacterUpdateRequest $request, Character $character)
    {
        $character->update($request->validated());

        $request->session()->flash('character.id', $character->id);

        return redirect()->route('character.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Character $character
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Character $character)
    {
        if ($request->user()->can('delete', $character)) {
            $character->delete();
        }

        return redirect()->route('character.index');
    }
}
