<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\MagicLinkController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\DashboardController;

// Public routes
Route::get('/login', [MagicLinkController::class, 'showLogin'])->name('login');
Route::post('/magic-link', [MagicLinkController::class, 'sendMagicLink'])->name('magic-link.send');
Route::get('/magic-link/verify/{token}', [MagicLinkController::class, 'verify'])->name('magic-link.verify');

// Protected routes
Route::middleware('auth')->group(function () {
    Route::get('/', [HomeController::class, 'index'])->name('home');
    Route::post('/logout', [MagicLinkController::class, 'logout'])->name('logout');

    // Onboarding routes
    Route::prefix('onboarding')->name('onboarding.')->group(function () {
        Route::get('/', [OnboardingController::class, 'start'])->name('start');
        Route::post('/choose-role', [OnboardingController::class, 'chooseRole'])->name('chooseRole');
        
        // Seller onboarding
        Route::get('/store-setup', [OnboardingController::class, 'storeSetup'])->name('storeSetup');
        Route::post('/store-setup', [OnboardingController::class, 'saveStore'])->name('saveStore');
        Route::get('/setup-complete/{store}', [OnboardingController::class, 'setupComplete'])->name('setupComplete');
        
        // User onboarding
        Route::get('/profile', [OnboardingController::class, 'userProfile'])->name('userProfile');
        Route::post('/profile', [OnboardingController::class, 'saveUserProfile'])->name('saveUserProfile');
        
        Route::get('/dietary-preferences', [OnboardingController::class, 'dietaryPreferences'])->name('dietaryPreferences');
        Route::post('/dietary-preferences', [OnboardingController::class, 'saveDietaryPreferences'])->name('saveDietaryPreferences');
        
        Route::get('/interests', [OnboardingController::class, 'interests'])->name('interests');
        Route::post('/interests', [OnboardingController::class, 'saveInterests'])->name('saveInterests');
        
        Route::get('/welcome', [OnboardingController::class, 'welcome'])->name('welcome');
    });

    // Dashboard routes
    Route::prefix('dashboard')->name('dashboard.')->group(function () {
        Route::get('/farm', [DashboardController::class, 'farm'])->name('farm');
        Route::get('/poultry', [DashboardController::class, 'poultry'])->name('poultry');
        Route::get('/bakery', [DashboardController::class, 'bakery'])->name('bakery');
        Route::get('/grocery', [DashboardController::class, 'grocery'])->name('grocery');
        Route::get('/restaurant', [DashboardController::class, 'restaurant'])->name('restaurant');
        Route::get('/coffee', [DashboardController::class, 'coffee'])->name('coffee');
        Route::get('/default', function () {
            return Inertia::render('Dashboard/Default');
        })->name('default');
    });

    // Other routes
    Route::get('/map', function () {
        return Inertia::render('Map');
    })->name('map');
});