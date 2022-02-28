<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

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
        'seats_taken'
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
