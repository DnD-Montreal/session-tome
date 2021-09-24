<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'email_verified_at',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'email_verified_at' => 'timestamp',
        'created_at' => 'timestamp',
        'updated_at' => 'timestamp',
    ];


    public function leagues()
    {
        return $this->belongsToMany(\App\Models\League::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(\App\Models\Campaign::class);
    }

    public function roles()
    {
        return $this->belongsToMany(\App\Models\Role::class);
    }

    public function characters()
    {
        return $this->hasMany(\App\Models\Character::class);
    }

    public function ratings()
    {
        return $this->hasMany(\App\Models\Rating::class);
    }
}
