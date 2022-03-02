<?php

namespace App\Jobs;

use app\Models\Session;
use app\Models\Entry;
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
        //dispatch job to queue here?
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
            ->with('characters')
            ->get();

        //create entry for all characters & dm in $sessions
        //figure out how to do this in < O(n^2)
        foreach ($sessions as $session) {
            foreach ($session->characters as $character) {
                Entry::create([
                    'user_id' => $character->user_id,
                    'adventure_id' => $session->adventure_id,
                    'character_id' => $character->id,
                    'event_id' => $session->event_id,
                    'dungeon_master_id' => $session->dungeon_master_id,
                    'date_played' => $session->start_time,
                    'location' =>$session->event->location,
                    'type' => Entry::TYPE_GAME,
                ]);
            }

            //create DM's entry
            Entry::create([
                'user_id' => $character->user_id,
                'adventure_id' => $session->adventure_id,
                'event_id' => $session->event_id,
                'dungeon_master_id' => $session->dungeon_master_id,
                'date_played' => $session->start_time,
                'location' => $session->event->location,
                'type' => Entry::TYPE_DM,
            ]);
        }
    }
}
