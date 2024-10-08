<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/example', function () {
    return response()->json(['message' => 'This is a GET request']);
});

Route::post('/example', function (Request $request) {
    $data = $request->all();
    return response()->json(['message' => 'This is a POST request', 'data' => $data]);
});