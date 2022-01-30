<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LocustAuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/locust', [App\Http\Controllers\LocustAuthController::class, 'getToken']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::delete('/locust', [App\Http\Controllers\LocustAuthController::class, 'deleteCharacters']);

    Route::post('/character', [App\Http\Controllers\CharacterController::class, 'store'])
        ->name("character.store");
});
