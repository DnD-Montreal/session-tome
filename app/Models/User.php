<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableInterface;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements AuthenticatableInterface
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasApiTokens;
    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    use Filterable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'language'
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

    /**
     * The accessors to append to the model's array form.
     *
     * @var array
     */
    protected $appends = ['total_ratings'];

    protected $filterableFields = ['name'];

    protected $filterableLimit = 10;

    public function leagues()
    {
        return $this->belongsToMany(\App\Models\League::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(\App\Models\Campaign::class)->withPivot('is_dm');
    }

    public function roles(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\Role::class)->withPivot('league_id');
    }

    public function characters()
    {
        return $this->hasMany(\App\Models\Character::class);
    }

    public function items()
    {
        return $this->hasManyThrough(\App\Models\Item::class, \App\Models\Character::class);
    }

    public function authored_items()
    {
        return $this->hasMany(\App\Models\Item::class, "author_id");
    }

    public function ratings()
    {
        return $this->hasMany(\App\Models\Rating::class);
    }

    public function sessions()
    {
        return $this->hasMany(\App\Models\Session::class, "dungeon_master_id");
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

    public function isLeagueAdminRole(): bool
    {
        return $this->hasRole(Role::LEAGUE_ADMIN);
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

    public function getTotalRatingsAttribute()
    {
        $labels = [
            Rating::CREATIVE_LABEL,
            Rating::FLEXIBLE_LABEL,
            Rating::FRIENDLY_LABEL,
            Rating::HELPFUL_LABEL,
            Rating::PREPARED_LABEL
        ];

        $total = collect([
            $labels[0] => 0,
            $labels[1] => 0,
            $labels[2] => 0,
            $labels[3] => 0,
            $labels[4] => 0,
        ]);
        foreach ($this->ratings as $rating) {
            $tempStr = str_pad(decbin($rating->categories), 5, "0", STR_PAD_LEFT);
            for ($i = 0; $i < strlen($tempStr); $i++) {
                $total[$labels[$i]] += (int) $tempStr[$i];
            }
        }
        return $total;
    }
}
