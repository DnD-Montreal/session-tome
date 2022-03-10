<?php

namespace App\Jobs;

use App\Models\Event;
use App\Models\Session;
use App\Models\Entry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

//Remove ShouldBeUnique if we partition the sessions to be handled
class AutomateSessionEntries implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        //Grab all existing live/past sessions in DB and load characters
        $sessions = Session::where('start_time', '<=', Carbon::now())
            ->where('start_time', '>', Carbon::now()->subMinutes(15))
            ->with('characters')
            ->get();

        //entry creation input arrays for all characters & dm in $sessions
        $input_arrays = collect([]);
        foreach ($sessions as $session) {
            foreach ($session->characters as $character) {
                $input_arrays->push(collect([
                    'user_id' => $character->user_id,
                    'adventure_id' => $session->adventure_id,
                    'character_id' => $character->id,
                    'event_id' => $session->event_id,
                    'dungeon_master_id' => $session->dungeon_master_id,
                    'date_played' => $session->start_time,
                    'location' =>$session->event->location,
                    'type' => Entry::TYPE_GAME,
                ]));
            }

            //create DM's entry
            $input_arrays->push(collect([
                'user_id' => $session->dungeon_master_id,
                'adventure_id' => $session->adventure_id,
                'event_id' => $session->event_id,
                'date_played' => $session->start_time,
                'location' => $session->event->location,
                'type' => Entry::TYPE_DM,
            ]));
        }

        //instantiate all entries with input arrays
        $event_ids = $input_arrays->pluck('event_id'); //is it possible to use pluck on regular 2d arrays (not collection)
        $events = Event::whereIn('id', $event_ids)->get();
        foreach ($events as $event) {
            $event_entries = $input_arrays->where('event_id', $event->id);
            $event->entries()->createMany($event_entries->toArray());
        }
    }
}
