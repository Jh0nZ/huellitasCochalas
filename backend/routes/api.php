<?php

use App\Http\Controllers\AdoptionRequestController;
use App\Http\Controllers\AdoptionRequestImageController;
use App\Http\Controllers\BreedController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\PetController;
use App\Http\Controllers\PetImageController;
use App\Http\Controllers\SizeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::apiResource('adoption-requests', AdoptionRequestController::class);
Route::apiResource('adoption-request-images', AdoptionRequestImageController::class);
Route::apiResource('breeds', BreedController::class);
Route::apiResource('images', ImageController::class);
Route::apiResource('pets', PetController::class);
Route::apiResource('pet-images', PetImageController::class);
Route::apiResource('sizes', SizeController::class);