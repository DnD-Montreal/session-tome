<?php

namespace App\Actions;

use App\Models\Entry;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateAndAttachRating
{
    use AsAction;

    /**
     * Expect an array of rating_data, create Rating and modify categories as required
     *
     * @param Entry $entry
     * @param array $ratingData
     */
    public function handle(Entry $entry, array $ratingData)
    {
        $rating = Rating::create([
            'entry_id' => $entry->id,
            'user_id' => $entry->dungeon_master_id,
            'author_id' => $entry->user_id,
            'categories' => 0,
        ]);

        $ratingMap = collect([
            Rating::CREATIVE_LABEL  => Rating::CREATIVE_BITMASK ,
            Rating::FLEXIBLE_LABEL => Rating::FLEXIBLE_BITMASK,
            Rating::FRIENDLY_LABEL => Rating::FRIENDLY_BITMASK,
            Rating::HELPFUL_LABEL => Rating::HELPFUL_BITMASK,
            Rating::PREPARED_LABEL => Rating::PREPARED_BITMASK,
        ]);

        foreach ($ratingData as $category => $value) {
            if ($value) {
                $key = strtoupper($category);
                $rating->addCategory($ratingMap[$key]);
            }
        }

        $rating->save();

        return $rating;
    }
}
