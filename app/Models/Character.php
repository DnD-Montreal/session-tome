<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
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

    /**
     * Accessor which exposes a GP attribute on the model
     *
     * @return float
     */
    public function getGpAttribute()
    {
        return $this->entries()->pluck('gp')->sum();
    }

    public function stubEntries($entriesLevel = 1, $amount = null, $adventureId = null)
    {
        $stubs = array_merge([
            'user_id' => $this->user_id,
            'character_id' => $this->id,
            'levels' => $entriesLevel,
            'type' => Entry::TYPE_GAME
        ], is_null($adventureId) ? [] : ['adventure_id' => $adventureId]);

        // Note: Insert() doesn't fire events, thus will not trigger the observer
        return Entry::insert(array_fill(0, $amount ?? $this->level, $stubs));
    }
}
