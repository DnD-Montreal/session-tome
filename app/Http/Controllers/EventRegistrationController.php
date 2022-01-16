<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventRegistrationRequest;
use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpKernel\Exception\UnprocessableEntityHttpException;

class EventRegistrationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(EventRegistrationRequest $request)
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

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
