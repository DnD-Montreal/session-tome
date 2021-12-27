<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'entry_id',
        'user_id',
        'author_id',
        'categories',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'entry_id' => 'integer',
        'user_id' => 'integer',
        'author_id' => 'integer',
        'categories' => 'integer',
    ];

    public const CREATIVE_BITMASK = 1 << 0;    // 00001
    public const FLEXIBLE_BITMASK = 1 << 1;    // 00010
    public const FRIENDLY_BITMASK = 1 << 2;    // 00100
    public const HELPFUL_BITMASK = 1 << 3;     // 01000
    public const PREPARED_BITMASK = 1 << 4;    // 10000

    public const CREATIVE_LABEL = "CREATIVE";
    public const FLEXIBLE_LABEL = "FLEXIBLE";
    public const FRIENDLY_LABEL = "FRIENDLY";
    public const HELPFUL_LABEL = "HELPFUL";
    public const PREPARED_LABEL = "PREPARED";


    public function entry()
    {
        return $this->belongsTo(\App\Models\Entry::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function author()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    /**
     * Determines if the rating instance has a category given by the passed parameter
     * @param $bitMask
     * bitmask param should always be one of the bitmask constants defined on this model
     * @return bool
     */
    public function hasCategory($bitMask)
    {
        return ($this->categories & $bitMask) === $bitMask;
    }

    /**
     * Adds a category given by the bitmask parameter, which should be one of the bitmask constants defined on this model
     * @param $bitMask
     */
    public function addCategory($bitMask)
    {
        $this->categories |= $bitMask;
    }

    /**
     * Removes a category given by the bitmask parameter, which should be one of the bitmask constants defined on this model
     * @param $bitMask
     */
    public function removeCategory($bitMask)
    {
        $this->categories &= ~$bitMask;
    }

    /**
     * Returns category labels. Not recommended for large batches of requests, instead use hasCategory with bitmask
     * @returns Collection of strings corresponding to the rating categories of this entity
     */
    public function getCategoryLabels()
    {
        $labels = collect();
        $bitmasks = collect([
            self::CREATIVE_BITMASK,
            self::FLEXIBLE_BITMASK,
            self::FRIENDLY_BITMASK,
            self::HELPFUL_BITMASK,
            self::PREPARED_BITMASK,
        ]);

        foreach ($bitmasks as $mask) {
            if ($this->hasCategory($mask)) {
                $labels->push($this->getCategoryLabelFromMask($mask));
            }
        }

        return $labels;
    }

    /**
     * Get category label corresponding to a bitmask
     * @param $mask integer The bitmask
     * @return string The Label
     */
    private function getCategoryLabelFromMask($mask)
    {
        switch ($mask) {
            case self::CREATIVE_BITMASK:
                return self::CREATIVE_LABEL;

            case self::FLEXIBLE_BITMASK:
                return self::FLEXIBLE_LABEL;

            case self::FRIENDLY_BITMASK:
                return self::FRIENDLY_LABEL;

            case self::HELPFUL_BITMASK:
                return self::HELPFUL_LABEL;

            case self::PREPARED_BITMASK:
                return self::PREPARED_LABEL;

            default:
                return "";
        }
    }
}
