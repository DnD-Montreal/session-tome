<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntryStoreRequest;
use App\Models\Adventure;
use App\Models\Entry;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DMEntryController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $entries = Entry::where('type', Entry::TYPE_DM)
            ->where('user_id', Auth::id())
            ->get();

        // this should maybe have its own view..
        // potential fix in the future
        return view('entry.index', compact('entries'));
    }

    /**
     * @param Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $adventures = Adventure::all();
        return Inertia::render('Entry/Create/DmEntryCreate', compact('adventures'));
    }
}
