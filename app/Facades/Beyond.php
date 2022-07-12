<?php

namespace App\Facades;

use App\Models\Character;
use App\Services\BeyondAdapter;
use Illuminate\Support\Facades\Facade;

/**
 * Class Beyond
 *
 * @method Character getCharacter($url)
 *
 * @see BeyondAdapter
 */
class Beyond extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'beyond';
    }
}
