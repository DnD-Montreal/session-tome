<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Arr;

class Rating extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
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

    protected $appends = ['labels'];

    public const CREATIVE_BITMASK = 1 << 0;    // 00001

    public const FLEXIBLE_BITMASK = 1 << 1;    // 00010

    public const FRIENDLY_BITMASK = 1 << 2;    // 00100

    public const HELPFUL_BITMASK = 1 << 3;     // 01000

    public const PREPARED_BITMASK = 1 << 4;    // 10000

    public const CREATIVE_LABEL = 'CREATIVE';

    public const FLEXIBLE_LABEL = 'FLEXIBLE';

    public const FRIENDLY_LABEL = 'FRIENDLY';

    public const HELPFUL_LABEL = 'HELPFUL';

    public const PREPARED_LABEL = 'PREPARED';

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
     *
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
     *
     * @param $bitMask
     */
    public function addCategory($bitMask)
    {
        $this->categories |= $bitMask;
    }

    /**
     * Removes a category given by the bitmask parameter, which should be one of the bitmask constants defined on this model
     *
     * @param $bitMask
     */
    public function removeCategory($bitMask)
    {
        $this->categories &= ~$bitMask;
    }

    /**
     * Returns category labels. Not recommended for large batches of requests, instead use hasCategory with bitmask
     *
     * @returns Collection of strings corresponding to the rating categories of this entity
     */
    public function getLabelsAttribute()
    {
        $bitmasks = collect([
            self::CREATIVE_BITMASK => self::CREATIVE_LABEL,
            self::FLEXIBLE_BITMASK => self::FLEXIBLE_LABEL,
            self::FRIENDLY_BITMASK => self::FRIENDLY_LABEL,
            self::HELPFUL_BITMASK => self::HELPFUL_LABEL,
            self::PREPARED_BITMASK => self::PREPARED_LABEL,
        ]);

        //bit decomposition of the categories
        $bitFilter = 1;
        $bits = [];
        while ($bitFilter <= $this->categories) {
            if ($bitFilter & $this->categories) {
                $bits[] = $bitFilter;
            }
            $bitFilter = $bitFilter << 1;
        }

        return $bitmasks->only($bits);
    }

    public function scopeWithCategories($query, $bits)
    {
        $this->queryCategoriesBitmask($query, $bits, $containsCategories = true);
    }

    public function scopeWithoutCategories($query, $bits)
    {
        $this->queryCategoriesBitmask($query, $bits, $containsCategories = false);
    }

    protected function queryCategoriesBitmask($query, $bits, $containsCategories)
    {
        $bits = array_sum(Arr::wrap($bits));
        $queryOperator = $containsCategories ? '=' : '!=';

        //build the query
        //(categories & bits) <operator> bits
        $query->whereRaw("categories & $bits $queryOperator $bits");
    }
}
