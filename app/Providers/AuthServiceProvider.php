<?php

namespace App\Providers;

use App\Models\Character;
use App\Models\Entry;
use App\Models\Item;
use App\Models\Trade;
use App\Models\User;
use App\Policies\CharacterPolicy;
use App\Policies\EntryPolicy;
use App\Policies\ItemPolicy;
use App\Policies\TradePolicy;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        Character::class => CharacterPolicy::class,
        User::class => UserPolicy::class,
        Item::class => ItemPolicy::class,
        Entry::class => EntryPolicy::class,
        Trade::class => TradePolicy::class,
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        //
    }
}
