<?php

namespace App\Services;

use App\Models\Character;
use http\Message;
use Illuminate\Http\Client\PendingRequest;
use Illuminate\Http\Client\Response;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Str;
use Illuminate\Validation\UnauthorizedException;

/**
 * Wraps the DnD Beyond (unofficial) API in a wrapper for ease of access
 *
 * Class BeyondAdapter
 * @package App\Services
 */
class BeyondAdapter
{
    /**
     * @var array array Configuration parameters for the DnD Beyond Adapter
     */
    protected array $config;

    /**
     * @var PendingRequest client request manifest to DnD BeyondAPI
     */
    protected PendingRequest $client;

    protected Collection $characterData;

    public function __construct($config)
    {
        $this->config = $config;
        $this->client = Http::acceptJson();
        $this->characterData = collect();
    }

    /**
     * Extract Character data from DnD Beyonds API and Hydrate as Character Model
     *
     * @param $url
     * @return Character
     */
    public function getCharacter($url): Character
    {

        // Fetch character data, cache to avoid abusing DnD Beyond's API
        $data = $this->cacheCall(static::extractId($url));

        // Extract Data
        $data = [
            'user_id' => Auth::id(),
            'name' => $data['name'],
            'race' => $data['race']['fullName'],
            'class' => collect($data['classes'])->pluck('definition.name')->implode(" / "),
            'level' => collect($data['classes'])->pluck('level')->sum(),
            'faction' => Str::of($data['notes']['organizations'])->contains(Character::FACTIONS) ? $data['notes']['organizations'] : "",
        ];

        // Hydrate Model
        return new Character($data);
    }

    /**
     * Extract the character ID from a supplied url. Also supports if only the ID is passed.
     *
     * @param $url
     * @return string
     */
    private static function extractId($url): string
    {
        return Str::of($url)->explode("/")->last();
    }

    /**
     * Fetches data from dnd beyond, while also caching the response data. This helps prevent
     * overwhelming DnD Beyond's API (and avoids rate limits)
     *
     * @param $id
     * @return Collection|mixed
     */
    public function cacheCall($id)
    {
        if (Cache::has("character.{$id}")) {
            return Cache::get("character.{$id}");
        }

        $response = $this->client->get($this->config['base_url'] . $id);

        // Test character is public
        if ($response->clientError()) {
            throw new UnauthorizedException("This character is inaccessible.", $response->status());
        }

        // Cache the Json response data
        $data = collect($response->json()['data']);
        Cache::put("character.{$id}", $data, 3600);

        return $data;
    }
}
