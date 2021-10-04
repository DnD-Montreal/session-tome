<?php

namespace App\Services;

/**
 * Wraps the DnD Beyond (unofficial) API in a wrapper for ease of access
 *
 * Class BeyondAdapter
 * @package App\Services
 */
class BeyondAdapter
{
    public function getCharacter($url)
    {
        $id = static::extractId($url);
        // Test is public..

        // read json

        // hydrate character from data.
    }

    /**
     * extract the character ID from a supplied url
     * @param $url
     * @return int
     */
    private static function extractId($url)
    {
        return 0;
    }
}
