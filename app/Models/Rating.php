<?php

namespace App\Models;

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
        'score',
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
}
