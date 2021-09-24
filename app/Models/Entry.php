<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Entry extends Model
{
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
        'date_played' => 'timestamp',
        'gp' => 'decimal:2',
    ];


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
}
