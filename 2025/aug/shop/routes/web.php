<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;

use App\Http\Controllers\ProfileController;


use App\Http\Controllers\MagicLinkController;

// Public routes

// Protected routes
Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    
});



// Guest routes (unauthenticated users)
Route::middleware('guest')->group(function () {
    Route::get('/login', [MagicLinkController::class, 'showLogin'])->name('login');
    Route::post('/magic-link', [MagicLinkController::class, 'sendMagicLink'])->name('magic-link.send');
Route::get('/magic-link/verify/{token}', [MagicLinkController::class, 'verify'])->name('magic-link.verify');

    
    // Redirect root to login for guests
    Route::get('/', function () {
        return redirect()->route('login');
    });
});

// Authenticated routes
Route::middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Home', [
            'user' => auth()->user(),
        ]);
    })->name('home');
    Route::post('/logout', [MagicLinkController::class, 'logout'])->name('logout');
    
    // Todo routes (should also be protected)
    Route::get('/todos', [TodoController::class, 'index'])->name('todos.index');
    Route::post('/todos', [TodoController::class, 'store'])->name('todos.store');
    Route::put('/todos/{todo}', [TodoController::class, 'update'])->name('todos.update');
    Route::patch('/todos/{todo}/toggle', [TodoController::class, 'toggle'])->name('todos.toggle');
    Route::delete('/todos/{todo}', [TodoController::class, 'destroy'])->name('todos.destroy');
    Route::get('/profile', [ProfileController::class, 'show'])->name('profile.show');
    Route::get('/profile/edit', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile/update', [ProfileController::class, 'update'])->name('profile.update');

});

// Test route (you might want to protect this too)
Route::get('/test', function () {
    return Inertia::render('test'); // this will look for resources/js/pages/Test.jsx
})->name('test');
Route::get('/map', function () {
    return Inertia::render('MapPage');
})->name('map');
Route::get('/homepage', function () {
    return Inertia::render('HomePage');
})->name('map');
Route::get('/reset', function () {
    return Inertia::render('Auth/ResetPassword');
})->name('reset');
Route::get('/forgot', function () {
    return Inertia::render('Auth/ForgotPassword');
})->name('forgot');
Route::get('/cart', function () {
    return Inertia::render('CartPage');
})->name('cart');
Route::get('/chat', function () {
    return Inertia::render('ChatPage');
})->name('chat');
Route::get('/profiles', function () {
    return Inertia::render('ProfilePage');
})->name('profiles');

Route::get('/u/{username}', [ProfileController::class, 'public'])->name('profile.public');
