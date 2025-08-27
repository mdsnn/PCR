<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;

Route::get('/todos', [TodoController::class, 'index'])->name('todos.index');
Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
Route::patch('/todos/{todo}/toggle', [TodoController::class, 'toggle'])->name('todos.toggle');
Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::get('/test', function () {
    return Inertia::render('test'); // this will look for resources/js/pages/Test.jsx
})->name('test');

