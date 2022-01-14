<?php

namespace App\Providers;

use App\Models\Campaign;
use App\Models\Character;
use App\Models\Entry;
use App\Observers\CharacterObserver;
use App\Observers\EntryObserver;
use App\Observers\CampaignObserver;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        Entry::observe(EntryObserver::class);
        Character::observe(CharacterObserver::class);
        Campaign::observe(CampaignObserver::class);
    }
}
