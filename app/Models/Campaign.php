<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Campaign extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

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


    public function characters()
    {
        return $this->belongsToMany(\App\Models\Character::class);
    }

    public function users()
    {
        return $this->belongsToMany(\App\Models\User::class);
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
        return dechex(microtime(true)*1000);
    }
}
