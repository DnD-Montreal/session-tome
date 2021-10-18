<?php

namespace App\Facades;

use App\Models\Character;
use App\Services\AdventuresLeagueAdapter;
use Illuminate\Support\Facades\Facade;

/**
 * Class Beyond
 * @package App\Facades
 *
 * @method Character getCharacter($filePath)
 *
 * @see AdventuresLeagueAdapter
 */
class AdventuresLeague extends Facade
{
    protected static function getFacadeAccessor()
    {
        return 'adventuresleague';
    }
}
