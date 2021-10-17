<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'entry_id',
        'character_id',
        'name',
        'rarity',
        'tier',
        'description',
        'counted',
        'author_id',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'entry_id' => 'integer',
        'character_id' => 'integer',
        'author_id' => 'integer',
    ];


    public function trades()
    {
        return $this->belongsToMany(\App\Models\Trade::class);
    }

    public function entry()
    {
        return $this->belongsTo(\App\Models\Entry::class);
    }

    public function character()
    {
        return $this->belongsTo(\App\Models\Character::class);
    }

    public function user()
    {
        return $this->character->user;
    }

    public function author()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
