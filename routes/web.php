<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Str;
use App\Http\Controllers\TradeOfferController;

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

// uncomment and remove after adding
//Route::get('/', [App\Http\Controllers\HomeController::class, "show"]);

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('homepage');

Route::middleware(['auth', 'throttle'])->group(function () {
    Route::resource('user', App\Http\Controllers\UserController::class);

    Route::resource('rating', App\Http\Controllers\RatingController::class);

    Route::resource('adventure', App\Http\Controllers\AdventureController::class);

    Route::delete('/entry/{entry?}', [App\Http\Controllers\EntryController::class, 'destroy'])
        ->name("entry.destroy");

    Route::resource('entry', App\Http\Controllers\EntryController::class)->except('destroy');

    Route::resource('entry-bulk', App\Http\Controllers\BulkEntryController::class)
        ->only(['create', 'store']);

    Route::delete('/character/{character?}', [App\Http\Controllers\CharacterController::class, 'destroy'])
        ->name("character.destroy");

    Route::resource('character', App\Http\Controllers\CharacterController::class)->except('destroy');

    Route::resource('item', App\Http\Controllers\ItemController::class);

    Route::resource('trade', App\Http\Controllers\TradeController::class);

    Route::put('/offer/update', [App\Http\Controllers\TradeOfferController::class, 'update'])
        ->name("offer.update");

    Route::get('/offer/edit', [App\Http\Controllers\TradeOfferController::class, 'edit'])
        ->name("offer.edit");

    Route::get('/offer/create', [App\Http\Controllers\TradeOfferController::class, 'create'])
        ->name("offer.create");

    Route::resource('offer', App\Http\Controllers\TradeOfferController::class)->except('update', 'edit', 'create');

    Route::resource('event', App\Http\Controllers\EventController::class);

    Route::resource('session', App\Http\Controllers\SessionController::class);

    Route::resource('league', App\Http\Controllers\LeagueController::class);

    Route::resource('role', App\Http\Controllers\RoleController::class);

    Route::resource('campaign', App\Http\Controllers\CampaignController::class);

    Route::resource('beyond-import', App\Http\Controllers\BeyondImportController::class)
        ->only('store');

    Route::resource('adventures-league-import', App\Http\Controllers\AdventuresLeagueImportController::class)
        ->only(['index', 'store']);

    Route::resource('dm-entry', App\Http\Controllers\DMEntryController::class)
        ->only('index', 'create');

    Route::resource('attach-entry-to-character', App\Http\Controllers\BulkAttachController::class)->parameters([
        'attach-entry-to-character' => 'character'
        ])->only('update');

    Route::resource('registration', App\Http\Controllers\EventRegistrationController::class)
        ->only('store');

    Route::get('report/rating', App\Actions\GenerateRatingReport::class)
        ->name('report.rating')
        ->middleware('admin');

    Route::resource('campaign-registration', App\Http\Controllers\CampaignRegistrationController::class)
        ->only(['create', 'store']);
});



if (config('app.env') !== 'production') {
    Route::get('/token', fn () => csrf_token());
    Route::get('/dev/{path}', fn ($path) => Inertia::render($path))
        ->where(['path' => '.*']);
    Route::get('/dev-auth/{id}', fn ($id) => \Illuminate\Support\Facades\Auth::loginUsingId($id));
}
