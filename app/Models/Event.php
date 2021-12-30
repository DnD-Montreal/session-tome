<?php

namespace App\Models;

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
}
