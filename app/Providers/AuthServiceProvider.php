<?php

namespace App\Providers;

use App\Models\Character;
use App\Models\User;
use App\Models\Item;
use App\Models\User;
use App\Policies\CharacterPolicy;
use App\Policies\EntryPolicy;
use App\Policies\UserPolicy;
use App\Policies\ItemPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

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
