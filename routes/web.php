<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;

require __DIR__ . '/auth.php';

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

Route::resource('user', App\Http\Controllers\UserController::class);

Route::resource('rating', App\Http\Controllers\RatingController::class);

Route::resource('adventure', App\Http\Controllers\AdventureController::class);

Route::resource('entry', App\Http\Controllers\EntryController::class);

Route::resource('character', App\Http\Controllers\CharacterController::class);

Route::resource('item', App\Http\Controllers\ItemController::class);

Route::resource('trade', App\Http\Controllers\TradeController::class);

Route::resource('event', App\Http\Controllers\EventController::class);

Route::resource('session', App\Http\Controllers\SessionController::class);

Route::resource('league', App\Http\Controllers\LeagueController::class);

Route::resource('role', App\Http\Controllers\RoleController::class);

Route::resource('campaign', App\Http\Controllers\CampaignController::class);

if (config('app.env') !== 'production') {
    Route::get('/token', fn () => csrf_token());
    Route::get('/dev/{path}', fn ($path) => Inertia::render(Str::of($path)->replace('/', ' ')->title()->replace(' ', '/')))
        ->where(['path' => '.*']);
}
