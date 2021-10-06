<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class League extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'description',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];


    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class);
    }

    public function events()
    {
        return $this->hasMany(\App\Models\Event::class);
    }

    public function roles(): HasMany
    {
        return $this->hasMany(Role::class);
    }
}
