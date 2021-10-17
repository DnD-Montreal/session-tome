<?php

namespace App\Providers;

use App\Services\AdventuresLeagueAdaptor;
use App\Services\BeyondAdapter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->app->bind("beyond", fn () => new BeyondAdapter(config('beyond')));
        $this->app->bind("adventuresleague", fn () => new AdventuresLeagueAdaptor());
    }
}
