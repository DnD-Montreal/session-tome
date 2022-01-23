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

    /**
     * Accessor which exposes a tier attribute on the model
     *
     * @return float
     */
    public function getTierAttribute()
    {
        $tier = 0;
        //due to the uneven distribution of levels along the tiers,
        //I don't think there is any way to compute this value
        switch ($this->level) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
                $tier = 1;
                // no break
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
                $tier = 2;
                // no break
            case 11:
            case 12:
            case 13:
            case 14:
            case 15:
            case 16:
                $tier = 3;
                // no break
            case 17:
            case 18:
            case 19:
            case 20:
                $tier = 4;
                // no break
            default:
                $tier = 0;
        }
        return $tier;
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
