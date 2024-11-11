<?php

use App\Http\Controllers\AdoptionRequestController;
use App\Http\Controllers\AdoptionRequestImageController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PetImageController;
use App\Http\Controllers\SizeController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth')->group(function () {
    Route::apiResource('breeds', BreedController::class);
    Route::apiResource('sizes', SizeController::class);
    Route::apiResource('images', ImageController::class);
    Route::apiResource('pets', PetController::class);
    Route::apiResource('pet-images', PetImageController::class);
    Route::apiResource('adoption-requests', AdoptionRequestController::class);
    Route::apiResource('adoption-request-images', AdoptionRequestImageController::class);
    Route::apiResource('users', UserController::class);
    Route::post('logout', [UserController::class, 'logout']);
    Route::get('user', [UserController::class, 'getAuthenticatedUser']);
});

Route::post('/register', [UserController::class, 'store']);
Route::post('/login', [UserController::class, 'login']);
