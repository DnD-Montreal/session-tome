<?php

namespace App\Actions;

use App\Models\Character;
use App\Models\Event;
use App\Models\Session;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Lorisleiva\Actions\Concerns\AsAction;
use Symfony\Component\HttpFoundation\StreamedResponse;

class GenerateEventReport
{
    use AsAction;


    private const HEADINGS = [
        "Attendance ID",
        "Event ID",
        "Event Name",
        "Adventure ID",
        "Adventure Name",
        "Table", "Tier",
        "Character ID",
        "Character Name",
        "Race", "Classes",
        "Total Level",
        "Start Time",
        "Language",
        "User ID",
        "User Name"
    ];

    /**
     * Generates a CSV Report that tallies a users ratings on each dimension of their play style
     *
     * @param bool $onlyEventRatings
     * @return StreamedResponse
     */
    public function handle(Event $event)
    {
        //prep
        $suffix = "event-report";

        $sessions = $event->sessions;

        //get character data into columns
        $data = [];

        $attendanceCount = 0;
        foreach ($sessions as $session) {
            $characters = $session->characters;
            foreach ($characters as $character) {
                $attendanceCount += 1;
                $user = $character->user;
                if (!isset($data[$character->id])) {
                    $data[$character->id] = [
                        $user->id,
                        $user->name,
                        $character->id,
                        $character->name,
                        $character->race,
                        $character->class,
                        $character->background,
                    ];
                }
            }
        }

        return StreamCsvFile::run(self::HEADINGS, $data, $suffix);
    }
}
