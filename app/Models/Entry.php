<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
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
        'adventure_id',
        'campaign_id',
        'character_id',
        'event_id',
        'dungeon_master_id',
        'dungeon_master',
        'date_played',
        'location',
        'type',
        'levels',
        'gp',
        'notes',
        'downtime',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'user_id' => 'integer',
        'adventure_id' => 'integer',
        'campaign_id' => 'integer',
        'character_id' => 'integer',
        'event_id' => 'integer',
        'dungeon_master_id' => 'integer',
        'levels' => 'integer',
        'date_played' => 'datetime',
        'gp' => 'decimal:2',
        'downtime' => 'integer',
    ];

    protected $appends = ['session', 'reward'];

    public const TYPE_GAME = 'game';
    public const TYPE_DM = 'dm';
    public const TYPE_DOWNTIME = 'downtime';

    public const REWARD_ADVANCEMENT = "Advancement";
    public const REWARD_MAGIC_ITEM = "Magic Item";
    public const REWARD_CAMPAIGN = "Campaign Reward";

    public function items()
    {
        return $this->hasMany(\App\Models\Item::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function adventure()
    {
        return $this->belongsTo(\App\Models\Adventure::class);
    }

    public function campaign()
    {
        return $this->belongsTo(\App\Models\Campaign::class);
    }

    public function character()
    {
        return $this->belongsTo(\App\Models\Character::class);
    }

    public function event()
    {
        return $this->belongsTo(\App\Models\Event::class);
    }

    public function dungeonMaster()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function rating()
    {
        return $this->hasOne(\App\Models\Rating::class);
    }

    public function getSessionAttribute()
    {
        if (is_null($this->character_id) || is_null($this->adventure_id) || is_null($this->date_played)) {
            return null;
        }

        // refactor to scope query?
        return self::where('character_id', $this->character_id)
            ->where('adventure_id', $this->adventure_id)
            ->where('date_played', "<", $this->date_played)
            ->where('dungeon_master_id', $this->dungeon_master_id)
            ->count() + 1;
    }

    public function getRewardAttribute()
    {
        if (is_null($this->character_id)) {
            return "-";
        }

        if ($this->type == self::TYPE_DM) {
            if ($this->levels >= 1) {
                return self::REWARD_ADVANCEMENT;
            } elseif ($this->items()->count() >= 1) {
                return self::REWARD_MAGIC_ITEM;
            }

            return self::REWARD_CAMPAIGN;
        }
    }
}
