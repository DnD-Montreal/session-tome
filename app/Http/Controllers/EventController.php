<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventStoreRequest;
use App\Http\Requests\EventUpdateRequest;
use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Session;

class EventController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $events = Event::filtered($request->get('search'));
        if ($request->has('registered_user') || $request->has('registered_only')) {
            $events = $events->whereRegistered($request->get('registered_user'));
        }
        $events = $events->with('league')->get();

        return Inertia::render('Event/Event', compact('events'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('event.create');
    }

    /**
     * @param \App\Http\Requests\EventStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(EventStoreRequest $request)
    {
        $event = Event::create($request->validated());

        $request->session()->flash('event.id', $event->id);

        return redirect()->route('event.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Event $event
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Event $event)
    {
        $data = $request->validate([
            'registered_sessions' => "nullable|sometimes|boolean",
        ]);

        if (!empty($data['registered_sessions'])) {
            $sessions = Session::whereRegistered($event->id)->get();
        } else {
            $sessions = $event->sessions;
        }

        return Inertia::render('Event/Detail/EventDetail', [
            'event' => $event,
            'sessions' => $sessions,
        ]);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Event $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Event $event)
    {
        return view('event.edit', compact('event'));
    }

    /**
     * @param \App\Http\Requests\EventUpdateRequest $request
     * @param \App\Models\Event $event
     * @return \Illuminate\Http\Response
     */
    public function update(EventUpdateRequest $request, Event $event)
    {
        $event->update($request->validated());

        $request->session()->flash('event.id', $event->id);

        return redirect()->route('event.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Event $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Event $event)
    {
        $event->delete();

        return redirect()->route('event.index');
    }
}
