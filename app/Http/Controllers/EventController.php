<?php

namespace App\Http\Controllers;

use App\Http\Requests\EventStoreRequest;
use App\Http\Requests\EventUpdateRequest;
use App\Models\Character;
use App\Models\Event;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Session;

class EventController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function index(Request $request)
    {
        $events = Event::filtered($request->get('search'));
        if ($registered_only = (bool) !empty($request['registered_only'])) {
            $events = $events->whereRegistered($request->get('registered_user'));
        }
        $events = $events->with('league')->get();

        return Inertia::render('Event/Event', compact('events', 'registered_only'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Event $event
     * @return \Inertia\Response
     */
    public function show(Request $request, Event $event)
    {
        $data = $request->validate([
            'registered_sessions' => "nullable|sometimes|boolean",
        ]);

        if ($registered_sessions = (bool) !empty($data['registered_sessions'])) {
            $sessions = Session::whereRegistered($event->id)->get();
        } else {
            $sessions = $event->sessions;
        }

        $event->load('league');

        $sessions->load([
            'adventure',
            'dungeonMaster',
            'characters' => function ($query) {
                $query->where('user_id', Auth::id())->first();
            }
        ]);

        $allUserCharacters = Auth::user()->characters()->orderBy('updated_at', 'desc')->get();

        return Inertia::render('Event/Detail/EventDetail', [
            'event' => $event,
            'sessions' => $sessions,
            'allUserCharacters' => $allUserCharacters,
            'registered_sessions' => $registered_sessions
        ]);
    }
}
