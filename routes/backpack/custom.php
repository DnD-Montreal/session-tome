<?php

use Illuminate\Support\Facades\Route;

// --------------------------
// Custom Backpack Routes
// --------------------------
// This route file is loaded automatically by Backpack\Base.
// Routes you generate using Backpack\Generators will be placed here.

Route::group([
    'prefix'     => config('backpack.base.route_prefix', 'admin'),
    'middleware' => array_merge(
        (array) config('backpack.base.web_middleware', 'web'),
        (array) config('backpack.base.middleware_key', 'admin')
    ),
    'namespace'  => 'App\Http\Controllers\Admin',
], function () { // custom admin routes
    Route::crud('adventure', 'AdventureCrudController');
    Route::crud('campaign', 'CampaignCrudController');
    Route::crud('character', 'CharacterCrudController');
    Route::crud('entry', 'EntryCrudController');
    Route::crud('event', 'EventCrudController');
    Route::get('event/{id}/report', 'EventCrudController@report'); //can be reused to generate reports for other models
    Route::crud('item', 'ItemCrudController');
    Route::crud('league', 'LeagueCrudController');
    Route::crud('rating', 'RatingCrudController');
    Route::crud('role', 'RoleCrudController');
    Route::crud('session', 'SessionCrudController');
    Route::crud('trade', 'TradeCrudController');
    Route::crud('user', 'UserCrudController');
}); // this should be the absolute last line of this file
