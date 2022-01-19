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
        $characters = Character::where('user_id', Auth::user()->id)->get();
        $factions = array_values(Character::FACTIONS);

        return Inertia::render('Character/Character', compact('characters', 'factions'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $factions = array_values(Character::FACTIONS);
        return Inertia::render('Character/Create/CharacterCreate', compact('factions'));
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
     * @return \Inertia\Response
     */
    public function show(Request $request, Character $character)
    {
        if ($request->user()->cannot('view', $character)) {
            abort(403);
        }

        $entries = $character->entries()->with('adventure', 'items')->get();

        return Inertia::render('Character/Detail/CharacterDetail', compact('character', 'entries'));
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
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(CharacterUpdateRequest $request, Character $character)
    {
        $character->update($request->validated());

        $request->session()->flash('character.id', $character->id);


        return redirect()->back();
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Character $character
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, Character $character = null)
    {
        $user = $request->user();
        if ($request->has('characters')) {
            $characters = Character::whereIn('id', $request->get('characters', []))->get();
            // Foreach over all the characters so that we can check the policy against them.
            // Purposely not calling $characters->delete() here.
            foreach ($characters as $char) {
                if ($user->can('delete', $char)) {
                    $char->delete();
                }
            }
            return redirect()->route('character.index');
        }

        if ($user->can('delete', $character)) {
            $character->delete();
        }

        return redirect()->route('character.index');
    }
}
