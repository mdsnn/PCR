<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MagicLinkController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OnboardingController;
// Public routes
Route::get('/login', [MagicLinkController::class, 'showLogin'])->name('login');
Route::post('/magic-link', [MagicLinkController::class, 'sendMagicLink'])->name('magic-link.send');
Route::get('/magic-link/verify/{token}', [MagicLinkController::class, 'verify'])->name('magic-link.verify');

// Protected routes
Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::post('/logout', [MagicLinkController::class, 'logout'])->name('logout');
});


Route::get('/login', function () {
    return Inertia::render('Login');
})->name('login');
Route::get('/map', function () {
    return Inertia::render('Map');
})->name('map');



// Public routes
Route::get('/login', [MagicLinkController::class, 'showLogin'])->name('login');
Route::post('/magic-link', [MagicLinkController::class, 'sendMagicLink'])->name('magic-link.send');
Route::get('/magic-link/verify/{token}', [MagicLinkController::class, 'verify'])->name('magic-link.verify');




// Protected routes
Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::post('/logout', [MagicLinkController::class, 'logout'])->name('logout');
    Route::get('/onboarding', [OnboardingController::class, 'start'])->name('onboarding.start');
    Route::post('/onboarding/choose-role', [OnboardingController::class, 'chooseRole'])->name('onboarding.chooseRole');
    Route::get('/onboarding/store-setup', [OnboardingController::class, 'storeSetup'])->name('onboarding.storeSetup');
    Route::post('/onboarding/store-setup', [OnboardingController::class, 'saveStore'])->name('onboarding.saveStore');

});