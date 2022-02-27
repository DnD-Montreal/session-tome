<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationStoreRequest;
use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\UnauthorizedException;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

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

        /*
        Get all sessions that the current user is involved in as either a player or a game master
        =====================================================================================
        The final where statement is there to reduce the amount of sessions in the query result
        thus improving performance, however it potentially introduces an edge case
        where the user can register for a session s1 which overlaps with a session s2 when
        s2 is already in progress and the user is involved in s2.
        If the edge case becomes an issue, remove the final where clause.
        Keep in mind that removing it may result in a loss of performance
        */
        $userSessions = Session::whereHas('characters', function ($q) use ($userId) {
            $q->where('user_id', $userId);
        })
            ->orWhereHas('dungeonMaster', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->where('start_date', '>', now())
            ->get();

        dump($userSessions);

        if (!isset($data['session_id'])) {
            // if they're not choosing a specific session, just register them to an open table with seats
            $session = Session::hasOpenSeats($data['event_id'])
                ->inRandomOrder()
                ->first();
        } else {
            $session = Session::find($data['session_id']);
        }

        if (!$session->open_seats) {
            return back()->withErrors([
                'seats' => "There are not enough open seats for you to register!"
            ]);
        }

        foreach ($userSessions as $userSession) {
            if ($session->overlapsWith($userSession)) {
                return back()->withErrors([
                    'overlap' => "The session you have attempted to register for overlaps with one you are currently registered in."
                ]);
            }
        }

        $character->sessions()->attach($session);
        $character->save();

        return redirect('character.index');
    }
}
