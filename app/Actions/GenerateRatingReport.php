<?php

namespace App\Actions;

use App\Models\Entry;
use App\Models\Rating;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;
use Lorisleiva\Actions\Concerns\AsAction;

class GenerateRatingReport
{
    use AsAction;

    public function handle()
    {
        $columns = $this->prepareColumns();
        $ratings = Rating::with('user')->whereNotNull('entry_id')->get();
        $data = [];

        foreach ($ratings as $rating) {
            if (!isset($data[$rating->user_id])) {
                $data[$rating->user_id] = [$rating->user_id, $rating->user->name];
            }

            // Generate a 5 long array of bits to tally the categories
            $breakdown = str_split(str_pad(decbin($rating->categories), 5, "0", STR_PAD_LEFT));
            for ($i = 2; $i <= 6; $i++) {
                $data[$rating->user_id][$i] = $this->updateScore($i, $data[$rating->user_id], $breakdown);
            }
        }

        return $data;
    }

    /**
     * @return string[]
     */
    private function prepareColumns(): array
    {
        $headings = ["User ID", "Username"];
        $labels = [Rating::CREATIVE_LABEL, Rating::FLEXIBLE_LABEL, Rating::FRIENDLY_LABEL, Rating::HELPFUL_LABEL, Rating::PREPARED_LABEL];
        foreach ($labels as $label) {
            $headings[] = Str::title($label) . " Rating";
        }
        return $headings;
    }

    /**
     * increment the score for a particular column depending on the value in with bitwise label
     * @param int $index
     * @param array $row
     * @param array $breakdown
     * @return int|mixed
     */
    private function updateScore(int $index, array $row, array $breakdown): int
    {
        $delta = (int) $breakdown[$index-2];
        return isset($row[$index]) ? $row[$index] + $delta : $delta;
    }
}
