<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MagicLinkController;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Guest Routes (unauthenticated users only)
|--------------------------------------------------------------------------
*/

// Protected routes

Route::middleware('guest')->group(function () {
    Route::get('/login', [MagicLinkController::class, 'showLogin'])->name('login');
    Route::post('/magic-link', [MagicLinkController::class, 'sendMagicLink'])->name('magic-link.send');
    Route::get('/magic-link/verify/{token}', [MagicLinkController::class, 'verify'])->name('magic-link.verify');

    // Redirect guests hitting `/` → login
    Route::get('/', fn () => redirect()->route('login'));
});

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth')->group(function () {
    // Home
    Route::get('/', [HomeController::class, 'index'])->name('home');

    // Logout
    Route::post('/logout', [MagicLinkController::class, 'logout'])->name('logout');

    
    // Profile
    Route::prefix('profile')->name('profile.')->group(function () {
        Route::get('/', [ProfileController::class, 'show'])->name('show');
        Route::get('/edit', [ProfileController::class, 'edit'])->name('edit');
        Route::post('/update', [ProfileController::class, 'update'])->name('update');
    });
});

/*
|--------------------------------------------------------------------------
| Public Pages (Inertia)
|--------------------------------------------------------------------------
*/
Route::view('/test', 'Test')->name('test');
Route::view('/map', 'MapPage')->name('map');
Route::view('/homepage', 'HomePage')->name('homepage');
Route::view('/reset', 'Auth/ResetPassword')->name('reset');
Route::view('/forgot', 'Auth/ForgotPassword')->name('forgot');
Route::view('/cart', 'CartPage')->name('cart');
Route::view('/chat', 'ChatPage')->name('chat');
Route::view('/profiles', 'ProfilePage')->name('profiles');

/*
|--------------------------------------------------------------------------
| Public Profile Route
|--------------------------------------------------------------------------
*/
Route::get('/u/{username}', [ProfileController::class, 'public'])->name('profile.public');
