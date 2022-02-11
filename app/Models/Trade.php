<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Traits\Filterable;

class Trade extends Model
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
        'item_id',
        'character_id',
        'requested_items',
        'description',
        'status',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
        'item_id' => 'integer',
        'character_id' => 'integer',
    ];

    public const STATUS = ["open","closed"];

    protected $filterableFields = ['requested_items', 'description'];


    public function items()
    {
        return $this->belongsToMany(\App\Models\Item::class);
    }

    public function item()
    {
        return $this->belongsTo(\App\Models\Item::class);
    }

    public function character()
    {
        return $this->belongsTo(\App\Models\Character::class);
    }
}
