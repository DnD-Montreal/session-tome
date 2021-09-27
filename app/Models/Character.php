<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Character extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'race',
        'class',
        'level',
        'faction',
        'downtime',
        'status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];


    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sessions()
    {
        return $this->belongsToMany(\App\Models\Session::class);
    }

    public function campaigns()
    {
        return $this->belongsToMany(\App\Models\Campaign::class);
    }

    public function items()
    {
        return $this->hasMany(\App\Models\Item::class);
    }

    public function trades()
    {
        return $this->hasMany(\App\Models\Trade::class);
    }
}
