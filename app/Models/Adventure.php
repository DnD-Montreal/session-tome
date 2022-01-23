<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adventure extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'code',
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


    public function sessions()
    {
        return $this->hasMany(\App\Models\Session::class);
    }

    /**
     * Limits and filters adventures by title / code
     *
     * @param Builder $q
     * @param string $search
     * @return Builder
     */
    public function scopeFiltered($q, $search = "")
    {
        return $q->where('title', 'like', "%{$search}%")
            ->orWhere('code', 'like', "%{$search}%")
            ->limit(50);
    }
}
