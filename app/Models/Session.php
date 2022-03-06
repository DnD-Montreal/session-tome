<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

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
        'end_time',
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
        'end_time' => 'datetime',
    ];

    protected $appends = [
        'seats_left',
        'seats_taken',
        'is_registered',
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

    public function getOpenSeatsAttribute()
    {
        return $this->seats - $this->characters()->count();
    }

    public function getSeatsLeftAttribute()
    {
        return $this->attributes['seats'] - $this->seats_taken;
    }

    public function getSeatsTakenAttribute()
    {
        return $this->characters()->count();
    }

    public function scopeHasOpenSeats(Builder $q, $eventId = null)
    {
        if ($eventId) {
            $q = $q->where('event_id', $eventId);
        }

        return $q->withCount('characters')
            ->having('characters_count', "<", DB::raw('seats'));
    }

    /**
     * Determines if this session overlaps with the given session
     * @param Session $otherSession
     * @return bool true if overlapping
     */

    public function overlapsWith(Session $otherSession): bool
    {
        $otherSessionStart = $otherSession->start_time;
        $otherSessionEnd = $otherSession->end_time;

        $startTime = $this->start_time;
        $endTime= $this->end_time;

        $startsWithin = $startTime <= $otherSessionStart && $otherSessionStart <= $endTime;
        $endsWithin = $startTime <= $otherSessionEnd && $otherSessionEnd <= $endTime;

        return $startsWithin || $endsWithin;
    }
}
