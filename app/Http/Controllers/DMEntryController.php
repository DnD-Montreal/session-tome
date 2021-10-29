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
        $entries = DB::table('entries')
            ->where('type', Entry::TYPE_DM)
            ->get();

        return view('entry.index', compact('entries'));
    }
}
