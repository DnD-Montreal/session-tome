<?php

namespace App\Actions;

use App\Models\Entry;
use App\Models\Rating;
use Illuminate\Support\Facades\Auth;
use Lorisleiva\Actions\Concerns\AsAction;

class CreateAndAttachRating
{
    use AsAction;

    public function handle(Entry $entry, array $ratingData)
    {
        $rating = Rating::create([
            'entry_id' => $entry->id,
            'user_id' => $entry->dungeon_master_id,
            'author_id' => $entry->user_id,
            'categories' => 0,
        ]);
        foreach ($ratingData as $category => $value) {
            if ($category == 'creative' && $value) {
                $rating->addCategory(CREATIVE_BITMASK);
            } elseif ($category == 'flexible' && $value) {
                $rating->addCategory(FLEXIBLE_BITMASK);
            } elseif ($category == 'friendly' && $value) {
                $rating->addCategory(FRIENDLY_BITMASK);
            } elseif ($category == 'helpful' && $value) {
                $rating->addCategory(HELPFUL_BITMASK);
            } elseif ($category == 'prepared' && $value) {
                $rating->addCategory(PREPARED_BITMASK);
            }
        }

        $rating->save();

        return $rating;
    }
}
