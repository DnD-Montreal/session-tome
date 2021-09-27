<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
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
        'email_verified_at' => 'datetime',
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
