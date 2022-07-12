<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Role extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    public const SITE_ADMIN = 'site admin';

    public const LEAGUE_ADMIN = 'league admin';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'type',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(\App\Models\User::class)->withPivot('league_id');
    }
}
