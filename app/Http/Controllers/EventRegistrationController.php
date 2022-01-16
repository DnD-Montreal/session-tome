<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegistrationStoreRequest;
use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use Illuminate\Http\Request;
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
        $request->user()->can('update', $character);

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

        $character->sessions()->attach($session);
        $character->save();

        return redirect('character.index');
    }
}
