<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'name',
        'race',
        'class',
        'level',
        'faction',
        'background',
        'downtime',
        'status',
        'character_sheet',
        'background',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];

    public const FACTIONS = [
        'harpers' => "The Harpers",
        'order' => "The Order of the Gauntlet",
        'emerald' => "The Emerald Enclave",
        'lords' => "The Lords' Alliance",
        'zhentarim' => "The Zhentarim"

    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sessions()
    {
        return $this->belongsToMany(\App\Models\Session::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(\App\Models\Campaign::class);
    }

    public function items()
    {
        return $this->hasMany(\App\Models\Item::class);
    }

    public function trades()
    {
        return $this->hasMany(\App\Models\Trade::class);
    }

    public function entries()
    {
        return $this->hasMany(\App\Models\Entry::class);
    }

    public function stubEntries()
    {
        $stubs = [
            'user_id' => $this->user_id,
            'character_id' => $this->id,
            'levels' => 1,
            'type' => Entry::TYPE_GAME
        ];

        // Note: Insert() doesn't fire events, thus will not trigger the observer
        return Entry::insert(array_fill(0, $this->level, $stubs));
    }
}
