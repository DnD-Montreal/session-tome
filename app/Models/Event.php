<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Event extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;
    use Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'league_id',
        'title',
        'description',
        'location',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'league_id' => 'integer',
    ];

    protected $appends = [
        'scheduled_dates',
        'total_seats',
        'seats_left',
        'seats_taken',
        'is_registered',
    ];

    protected $filterableFields = [
        'title',
        'description',
        'location',
    ];

    public function entries()
    {
        return $this->hasMany(\App\Models\Entry::class);
    }

    public function sessions()
    {
        return $this->hasMany(\App\Models\Session::class);
    }

    public function league()
    {
        return $this->belongsTo(\App\Models\League::class);
    }

    public function scopeWhereRegistered(Builder $q, $userId = null)
    {
        return $q->whereRelation('sessions.characters', 'user_id', $userId ?? Auth::id())
            ->orWhereRelation('sessions.dungeonMaster', 'id', $userId ?? Auth::id());
    }

    /**
     * Indicates if the currently authenticated user is registered for this event
     *
     * @return bool
     */
    public function getIsRegisteredAttribute()
    {
        return $this->load('sessions.characters:user_id')->sessions
            ->pluck('characters.*.user_id')
            ->flatten()
            ->contains(Auth::id());
    }

    public function getScheduledDatesAttribute()
    {
        $dates = $this->sessions()
            ->orderBy('start_time')
            ->pluck('start_time')
            ->unique();

        return [
            $dates->first(),
            $dates->last()
        ];
    }

    public function getTotalSeatsAttribute()
    {
        return (int) $this->sessions()->sum('seats');
    }

    public function getSeatsLeftAttribute()
    {
        return (int) $this->sessions()->get()->pluck('open_seats')->sum();
    }

    public function getSeatsTakenAttribute()
    {
        return (int) $this->total_seats - $this->seats_left;
    }
}
