<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public const STATUS_OPEN = 'open';

    public const STATUS_CLOSED = 'closed';

    protected $filterableFields = ['requested_items', 'description'];

    public function offers()
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
