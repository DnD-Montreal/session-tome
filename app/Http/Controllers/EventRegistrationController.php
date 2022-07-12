<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationStoreRequest;
use App\Models\Character;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventRegistrationController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(RegistrationStoreRequest $request)
    {
        // this could probably be a request validator...
        $data = $request->validated();

        $character = Character::find($data['character_id']);

        $userId = Auth::id();

        $userSessions = Session::whereHas('characters', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })->orWhereHas('dungeonMaster', function ($q) use ($userId) {
            $q->where('id', $userId);
        })->get();

        if (! isset($data['session_id'])) {
            // if they're not choosing a specific session, just register them to an open table with seats
            $session = Session::hasOpenSeats($data['event_id'])
                ->inRandomOrder()
                ->first();
        } else {
            $session = Session::find($data['session_id']);
        }

        if (! $session->open_seats) {
            return back()->withErrors([
                'seats' => 'There are not enough open seats for you to register!',
            ]);
        }

        foreach ($userSessions as $userSession) {
            if ($session->overlapsWith($userSession)) {
                return back()->withErrors([
                    'overlap' => 'The session you have attempted to register for overlaps with one you are currently registered in.',
                ]);
            }
        }

        $character->sessions()->attach($session);
        $character->save();

        return redirect()->route('event.show', $session->event_id);
    }

    /**
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Session  $session
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Session $session)
    {
        $data = $request->validate([
            'character_id' => 'required|exists:characters,id|integer',
        ]);
        $character = Character::findOrFail($data['character_id']);

        if ($character->user->id == Auth::user()->id && $character->sessions->contains($session)) {
            $character->sessions()->detach($session);
        } else {
            return redirect()->back()->withErrors(['error' => 'Invalid deregistration. User must own character and be registered for session.']);
        }

        return redirect()->back();
    }
}
