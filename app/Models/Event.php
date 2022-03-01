<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Builder;
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

    protected $filterableFields = [
        'title',
        'description',
        'location'
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
}
