<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
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

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Role::class)->withPivot('league_id');
    }

    public function characters()
    {
        return $this->hasMany(\App\Models\Character::class);
    }

    public function ratings()
    {
        return $this->hasMany(\App\Models\Rating::class);
    }

    /**
     * Check if the user has one of a given list of roles
     * @param  string|array  $role one or more role types to check for
     * @return bool       Returns true is the user's role matches any the provided roles
     */
    public function hasRole($roles): bool
    {
        return count(array_intersect($this->roles->pluck('type')->toArray(), (array)$roles))>0;
    }

    public function isSiteAdmin(): bool
    {
        return $this->hasRole(Role::SITE_ADMIN);
    }

    /**
     * Check if the user has league admin role on a particular league
     * @param  string $league_name name of league we want to check if user has admin role on
     * @return bool       Returns true if the user has a league admin role for the given league
     */
    public function isLeagueAdmin($leagueId): bool
    {
        foreach ($this->roles as $role) {
            if ($role->pivot->league_id == $leagueId) {
                return true;
            }
        }
        return false;
    }

    public function hasAnyRole(): bool
    {
        return count($this->roles->pluck('name')->toArray()) > 0;
    }
}
