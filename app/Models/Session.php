<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Session extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'event_id',
        'adventure_id',
        'dungeon_master_id',
        'table',
        'start_time',
        'language',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'event_id' => 'integer',
        'adventure_id' => 'integer',
        'dungeon_master_id' => 'integer',
        'start_time' => 'datetime',
    ];

    protected $with = ['event'];

    public function characters()
    {
        return $this->belongsToMany(\App\Models\Character::class);
    }

    public function event()
    {
        return $this->belongsTo(\App\Models\Event::class);
    }

    public function adventure()
    {
        return $this->belongsTo(\App\Models\Adventure::class);
    }

    public function dungeonMaster()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function getDisplayTitleAttribute()
    {
        return "{$this->event->title} - Table {$this->attributes['table']}";
    }

    public function getTableTitleAttribute()
    {
        return "Table {$this->attributes['table']}";
    }
}
