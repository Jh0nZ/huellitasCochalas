<?php

use Illuminate\Support\Facades\Route;

// Route::get('/{any}', function () {
//     return view('index');
// })->where('any', '^(?!api).*$');


Route::get('/', function () {
    return view('welcome');
});
