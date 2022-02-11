<?php

namespace App\Http\Controllers;

use App\Actions\CreateEntryItems;
use App\Actions\CreateAndAttachRating;
use App\Http\Requests\EntryStoreRequest;
use App\Http\Requests\EntryUpdateRequest;
use App\Models\Character;
use App\Models\Adventure;
use App\Models\Entry;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use function PHPUnit\Framework\isEmpty;

class EntryController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        if ($userId = $request->get('user_id')) {
            $entries = Entry::where('user_id', $userId)->get();
        } else {
            $entries = Entry::where('user_id', Auth::user()->id)->get();
        }

        return view('entry.index', compact('entries'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @return \Inertia\Response
     */
    public function create(Request $request)
    {
        $campaigns = Auth::user()->campaigns;
        $data = $request->validate([
            'character_id' => "required|exists:characters,id|integer",
            'search' => "sometimes|string"
        ]);

        $character = Character::where('user_id', Auth::id())
            ->findOrFail($data['character_id']);

        $search = $data['search'] ?? "";

        return Inertia::render('Character/Detail/Entry/Create/EntryCreate', [
            'campaigns' => $campaigns,
            'character' => $character,
            'adventures' => fn () => Adventure::filtered($search)->get(['id', 'title', 'code']),
            'gameMasters' => fn () => User::filtered($search)->get(['id', 'name']),
        ]);
    }

    /**
     * @param \App\Http\Requests\EntryStoreRequest $request
     * @return \Illuminate\Http\RedirectResponse
     */
    public function store(EntryStoreRequest $request)
    {
        $entryData = collect($request->validated())->except('items', 'rating_data');
        $itemData = collect($request->validated())->only('items');
        $ratingData = collect($request->validated())->only('rating_data');

        if (!$entryData->has('user_id')) {
            $entryData['user_id'] = Auth::id();
        }
        if ($ratingData->has('rating_data')) {
            $ratingData = $ratingData['rating_data'];
        }

        if ($itemData->has('items')) {
            $itemData = $itemData['items'];
        }

        if ($itemData instanceof Collection) {
            $itemData = $itemData->toArray();
        }

        list($entryData, $itemData) = $this->chooseReward($entryData, $itemData);

        if (!empty($entryData['dungeon_master']['id']) && $entryData['type'] !== Entry::TYPE_DM) {
            $entryData['dungeon_master_id'] = $entryData['dungeon_master']['id'];
            unset($entryData['dungeon_master']['id']);
        }

        $entryData["adventure_id"] = $entryData['adventure']['id'];
        $entryData->forget('adventure');

        $entry = Entry::create($entryData->toArray());
        // attach any associated items to the entry in question.
        CreateEntryItems::run($entry, $itemData ?? []);
        $request->session()->flash('entry.id', $entry->id);

        if (!empty($ratingData) && is_array($ratingData) && $entry->dungeon_master_id && $entry->exists('dungeonMaster')) {
            CreateAndAttachRating::run($entry, $ratingData);
        }

        if ($request->type == Entry::TYPE_DM) {
            return redirect()->route('dm-entry.index');
        }

        return redirect()->route('character.show', $entry->character_id);
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Entry $entry)
    {
        return view('entry.show', compact('entry'));
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, Entry $entry)
    {
        $campaigns = Auth::user()->campaigns;
        return view('entry.edit', compact('entry', 'campaigns'));
    }

    /**
     * @param \App\Http\Requests\EntryUpdateRequest $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\RedirectResponse
     */
    public function update(EntryUpdateRequest $request, Entry $entry)
    {
        $entryData = collect($request->validated())->except('items', 'rating_data');
        $itemData = collect($request->validated())->only('items');
        $ratingData = collect($request->validated())->only('rating_data');

        if ($ratingData->has('rating_data')) {
            $ratingData = $ratingData['rating_data'];
        }

        if ($itemData->has('items')) {
            $itemData = $itemData['items'];
        }

        if ($itemData instanceof Collection) {
            $itemData = $itemData->toArray();
        }

        list($entryData, $itemData) = $this->chooseReward($entryData, $itemData);

        if (!empty($entryData['dungeon_master']['id']) && $entryData['type'] !== Entry::TYPE_DM) {
            $entryData['dungeon_master_id'] = $entryData['dungeon_master']['id'];
            unset($entryData['dungeon_master']['id']);
        }

        $entryData["adventure_id"] = $entryData['adventure']['id'];
        $entryData->forget('adventure');

        $entry->update($entryData->toArray());
        CreateEntryItems::run($entry, $itemData ?? []);
        $request->session()->flash('entry.id', $entry->id);

        // need to find alternative to empty, this is true even if no rating_data found
        if (!empty($ratingData) && is_array($ratingData) && $entry->dungeon_master_id) {
            CreateAndAttachRating::run($entry, $ratingData);
        }

        if ($request->type == Entry::TYPE_DM) {
            return redirect()->back();
        }

        return redirect()->back();
    }

    /**
     * @param \Illuminate\Http\Request $request
     * @param \App\Models\Entry $entry
     * @return \Illuminate\Http\RedirectResponse
     */
    public function destroy(Request $request, Entry $entry = null)
    {
        $user = $request->user();
        $data = $request->validate([
            'entries' => 'sometimes|array'
        ]);

        if ($request->has('entries')) {
            $entries = Entry::whereIn('id', $data['entries'])->get();

            foreach ($entries as $arrayEntry) {
                if ($user->can('delete', $arrayEntry)) {
                    $arrayEntry->delete();
                }
            }
        }

        if ($user->can('delete', $entry)) {
            $entry->delete();
        }

        return redirect()->back();
    }

    /**
     * @param Collection $entryData
     * @param array $itemData
     * @return array
     */
    private function chooseReward(Collection $entryData, array $itemData): array
    {
        if ($entryData->get('choice') == 'advancement') {
            // advancement: increment character's level
            $entryData['levels'] = 1;
            $itemData = [];
        } elseif ($entryData->get('choice') == 'magic_item') {
            // magic_item: attach item to character of choice, and set entry's levels to 0
            $itemData = [$itemData[0] ?? []];
            $entryData['levels'] = 0;
        } elseif ($entryData->get('choice') == 'campaign_reward') {
            // campaign reward: set levels = 0, no item(s), should contain custom note
            $itemData = [];
            $entryData['levels'] = 0;
        }
        return array($entryData, $itemData);
    }
}
