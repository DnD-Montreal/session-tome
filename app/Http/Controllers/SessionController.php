<?php

namespace App\Http\Controllers;

use App\Http\Requests\SessionStoreRequest;
use App\Http\Requests\SessionUpdateRequest;
use App\Models\Session;
use Illuminate\Http\Request;

class SessionController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sessions = Session::all();

        return view('session.index', compact('sessions'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return view('session.create');
    }

    /**
     * @param \App\Http\Requests\SessionStoreRequest $request
     * @return \Illuminate\Http\Response
     */
    public function store(SessionStoreRequest $request)
    {
        $session = Session::create($request->validated());

        $request->session()->flash('session.id', $session->id);

        return redirect()->route('session.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Session $session
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Session $session)
    {
        return view('session.show', compact('session'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Session $session
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Session $session)
    {
        return view('session.edit', compact('session'));
    }

    /**
     * @param \App\Http\Requests\SessionUpdateRequest $request
     * @param \App\Models\Session $session
     * @return \Illuminate\Http\Response
     */
    public function update(SessionUpdateRequest $request, Session $session)
    {
        $session->update($request->validated());

        $request->session()->flash('session.id', $session->id);

        return redirect()->route('session.index');
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Session $session
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request, Session $session)
    {
        $session->delete();

        return redirect()->route('session.index');
    }
}
