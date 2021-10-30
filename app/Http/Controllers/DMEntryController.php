<?php

namespace App\Http\Controllers;

use App\Http\Requests\EntryStoreRequest;
use App\Models\Entry;
use Illuminate\Http\Request;

class DMEntryController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $entries = Entry::where('type', Entry::TYPE_DM)->get();

        // this should maybe have its own view..
        // potential fix in the future
        return view('entry.index', compact('entries'));
    }
}
