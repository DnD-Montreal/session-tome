<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Campaign extends Model
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
        'adventure_id',
        'title',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'adventure_id' => 'integer',
    ];

    /**
     * The relations that should be eager loaded
     *
     * @var string[]
     */
    protected $with = ['users'];

    /**
     * The accessors and mutators that should be passed / loaded at all times.
     *
     * @var string[]
     */
    protected $appends = ['is_owner'];

    /**
     * The attributes that should be fuzzy searched on when filtering
     *
     * @var string[]
     */
    protected $filterableFields = ['title'];

    public function characters()
    {
        return $this->belongsToMany(\App\Models\Character::class);
    }

    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class)->withPivot(['is_dm', 'is_owner']);
    }

    public function entries()
    {
        return $this->hasMany(\App\Models\Entry::class);
    }

    public function adventure()
    {
        return $this->belongsTo(\App\Models\Adventure::class);
    }

    public function generateCode()
    {
        return dechex(microtime(true) * 10000);
    }

    public function getIsOwnerAttribute()
    {
        if ($userId = Auth::id()) {
            return $this->users->pluck('pivot.is_owner', 'id')->contains(fn ($v, $k) => $k == $userId && $v == 1);
        }

        return  false;
    }
}
