<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PreferenceController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('registration', [AuthController::class, 'registration']);
Route::post('login', [AuthController::class, 'login']);
Route::get('getallpreference', [PreferenceController::class, 'getAllPreference']);
Route::get('storeNewsFromApi', [NewsController::class, 'storeNewsFromAPI']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('setpreference', [PreferenceController::class, 'setPreference']);
    Route::get('getpreference', [PreferenceController::class, 'getPreference']);
    Route::get('getallnews', [NewsController::class, 'getAllNews']);
    Route::get('getpreferencenews', [NewsController::class, 'getPreferenceNews']);
});
