<?php

namespace App\Facades;

use App\Models\Character;
use App\Services\AdventuresLeagueAdaptor;
use Illuminate\Support\Facades\Facade;

/**
 * Class Beyond
 * @package App\Facades
 *
 * @method Character getCharacter($filePath)
 *
 * @see AdventuresLeagueAdaptor
 */
class AdventuresLeague extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'adventuresleague';
    }
}
