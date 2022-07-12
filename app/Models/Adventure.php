<?php

namespace App\Models;

use App\Models\Traits\Filterable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Adventure extends Model
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
        'title',
        'code',
        'description',
        'tier',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'id' => 'integer',
    ];

    protected $filterableFields = ['code', 'title'];

    public function sessions()
    {
        return $this->hasMany(\App\Models\Session::class);
    }
}
