<?php

namespace App\Jobs;

use App\Models\Entry;
use App\Models\Event;
use App\Models\Session;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class AutomateSessionEntries implements ShouldQueue, ShouldBeUnique
{
    use Dispatchable;
    use InteractsWithQueue;
    use Queueable;
    use SerializesModels;

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
        $inputArrays = collect();
        foreach ($sessions as $session) {
            foreach ($session->characters as $character) {
                $inputArrays->push([
                    'user_id' => $character->user_id,
                    'adventure_id' => $session->adventure_id,
                    'character_id' => $character->id,
                    'event_id' => $session->event_id,
                    'dungeon_master_id' => $session->dungeon_master_id,
                    'date_played' => $session->start_time,
                    'location' => $session->event->location,
                    'type' => Entry::TYPE_GAME,
                ]);
            }

            //fill DM entry's input array
            $inputArrays->push([
                'user_id' => $session->dungeon_master_id,
                'adventure_id' => $session->adventure_id,
                'event_id' => $session->event_id,
                'date_played' => $session->start_time,
                'location' => $session->event->location,
                'type' => Entry::TYPE_DM,
            ]);
        }

        //instantiate all entries with input arrays
        $eventIds = $inputArrays->pluck('event_id');
        $events = Event::whereIn('id', $eventIds)->get();
        foreach ($events as $event) {
            $eventEntries = $inputArrays->where('event_id', $event->id);
            $event->entries()->createMany($eventEntries->toArray());
        }
    }
}
