<?php

use App\Http\Controllers\BreedController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\SizeController;
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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('breeds', BreedController::class);
Route::apiResource('sizes', SizeController::class);
Route::apiResource('images', ImageController::class);
Route::apiResource('pets', PetController::class);

