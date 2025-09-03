<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');
Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');
Route::get('/map', function () {
    return Inertia::render('Map');
})->name('map');
