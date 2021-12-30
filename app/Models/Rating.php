<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rating extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'entry_id',
        'user_id',
        'author_id',
        'score',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'entry_id' => 'integer',
        'user_id' => 'integer',
        'author_id' => 'integer',
    ];


    public function entry()
    {
        return $this->belongsTo(\App\Models\Entry::class);
    }

    public function user()
    {
        return $this->belongsTo(\App\Models\User::class);
    }

    public function author()
    {
        return $this->belongsTo(\App\Models\User::class);
    }
}
