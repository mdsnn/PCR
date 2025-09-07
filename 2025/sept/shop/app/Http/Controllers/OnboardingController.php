<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;

class OnboardingController extends Controller
{
    public function start()
    {
        $user = Auth::user();
        
        // If user has already completed onboarding, redirect them
        if ($user->onboarding_complete) {
            return redirect()->to($user->redirectAfterLogin());
        }

        return inertia('Onboarding/Start', [
            'user' => $user->only(['name', 'email'])
        ]);
    }

    public function chooseRole(Request $request)
    {
        $request->validate([
            'role' => 'required|in:buyer,seller'
        ]);

        $user = Auth::user();

        if ($request->role === 'seller') {
            $user->is_seller = true;
            $user->save();

            return redirect()->route('onboarding.storeSetup');
        }

        // Redirect to user onboarding flow
        return redirect()->route('onboarding.userProfile');
    }

    // ===================
    // SELLER ONBOARDING
    // ===================

    public function storeSetup()
    {
        $user = Auth::user();
        
        if (!$user->is_seller) {
            return redirect()->route('onboarding.start');
        }

        return inertia('Onboarding/StoreSetup', [
            'storeTypes' => $this->getStoreTypes(),
            'user' => $user->only(['name', 'email'])
        ]);
    }

    public function saveStore(Request $request)
    {
        $user = Auth::user();
        
        if (!$user->is_seller) {
            return redirect()->route('onboarding.start');
        }

        $request->validate([
            'name'        => 'required|string|max:255|unique:stores,name',
            'type'        => ['required', 'string', Rule::in(array_keys($this->getStoreTypes()))],
            'description' => 'nullable|string|max:1000',
            'location'    => 'required|string|max:255',
            'latitude'    => 'nullable|numeric|between:-90,90',
            'longitude'   => 'nullable|numeric|between:-180,180',
            'logo'        => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'phone'       => 'nullable|string|max:20',
            
        ]);

        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('store-logos', 'public');
        }

        $store = Store::create([
            'user_id'     => $user->id,
            'name'        => $request->name,
            'type'        => $request->type,
            'description' => $request->description,
            'location'    => $request->location,
            'latitude'    => $request->latitude,
            'longitude'   => $request->longitude,
            'logo'        => $logoPath,
            'phone'       => $request->phone,
            'website'     => $request->website,
        ]);

        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('onboarding.setupComplete', ['store' => $store->id]);
    }

    public function setupComplete(Store $store)
    {
        if ($store->user_id !== Auth::id()) {
            abort(403);
        }

        return inertia('Onboarding/SetupComplete', [
            'store' => $store->load('user'),
            'dashboardUrl' => route("dashboard.{$store->type}")
        ]);
    }

    // ===================
    // USER ONBOARDING
    // ===================

    public function userProfile()
    {
        $user = Auth::user();
        
        if ($user->is_seller) {
            return redirect()->route('onboarding.storeSetup');
        }

        return inertia('Onboarding/UserProfile', [
            'user' => $user->only(['name', 'email', 'username', 'bio', 'location']),
            'progress' => $this->calculateUserOnboardingProgress($user, 1)
        ]);
    }

    public function saveUserProfile(Request $request)
    {
        $user = Auth::user();
        
        if ($user->is_seller) {
            return redirect()->route('onboarding.storeSetup');
        }

        $request->validate([
        'name' => 'required|string|max:255',
        'profile_picture' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
      ]);

       $profilePicturePath = $user->profile_picture;
        if ($request->hasFile('profile_picture')) {
            if ($profilePicturePath && Storage::disk('public')->exists($profilePicturePath)) {
            Storage::disk('public')->delete($profilePicturePath);
            }
            $profilePicturePath = $request->file('profile_picture')->store('profile-pictures', 'public');
        }

        $user->update([
            'name' => $request->name,
            'profile_picture' => $profilePicturePath,
        ]);

        return redirect()->route('onboarding.welcome');
    }

    public function dietaryPreferences()
    {
        $user = Auth::user();
        
        if ($user->is_seller) {
            return redirect()->route('onboarding.storeSetup');
        }

        return inertia('Onboarding/DietaryPreferences', [
        'user' => $user->only(['allergies', 'dietary_restrictions']),
        'commonAllergies' => $this->getCommonAllergies(),
        'dietaryOptions' => $this->getDietaryOptions(),
        ]);
    }

    public function saveDietaryPreferences(Request $request)
    {
        $user = Auth::user();
        
        if ($user->is_seller) {
            return redirect()->route('onboarding.storeSetup');
        }

        $request->validate([
        'allergies' => 'nullable|array|max:10',
        'allergies.*' => 'string|max:100',
        'dietary_restrictions' => 'nullable|array|max:10',
        'dietary_restrictions.*' => 'string|max:100',
        ]);

        $user->update([
        'allergies' => $request->allergies ?? [],
        'dietary_restrictions' => $request->dietary_restrictions ?? [],
        'onboarding_complete' => true,
        'email_verified_at' => now(),
        ]);

        return redirect()->route('onboarding.interests');
    }

    public function interests()
    {
        $user = Auth::user();
        
        if ($user->is_seller) {
            return redirect()->route('onboarding.storeSetup');
        }

        return inertia('Onboarding/Interests', [
            'user' => $user->only([
                'food_interests', 'cooking_level', 'social_preferences', 'notification_preferences'
            ]),
            'interestCategories' => $this->getInterestCategories(),
            'cookingLevels' => $this->getCookingLevels(),
            'socialOptions' => $this->getSocialOptions(),
            'notificationOptions' => $this->getNotificationOptions(),
            'progress' => $this->calculateUserOnboardingProgress($user, 3)
        ]);
    }

    public function saveInterests(Request $request)
    {
        $user = Auth::user();
        
        if ($user->is_seller) {
            return redirect()->route('onboarding.storeSetup');
        }

        $request->validate([
            'food_interests' => 'nullable|array|max:20',
            'food_interests.*' => 'string|max:100',
            'cooking_level' => 'nullable|in:beginner,intermediate,advanced,professional',
            'social_preferences' => 'nullable|array|max:10',
            'social_preferences.*' => 'string|max:100',
            'notification_preferences' => 'nullable|array|max:10',
            'notification_preferences.*' => 'string|max:100',
        ]);

        $user->update([
            'food_interests' => $request->food_interests ?? [],
            'cooking_level' => $request->cooking_level,
            'social_preferences' => $request->social_preferences ?? [],
            'notification_preferences' => $request->notification_preferences ?? [],
            'onboarding_complete' => true,
            'email_verified_at' => now() // Mark email as verified since they used magic link
        ]);
        
        session(['show_welcome' => true]);
        return redirect()->route('onboarding.welcome');
    }

    public function welcome()
    {
        $user = Auth::user();
        
        if (!$user->onboarding_complete) {
            return redirect()->route('onboarding.start');
        }

        return inertia('Onboarding/Welcome', [
            'user' => $user->only(['name', 'username', 'profile_picture']),
            'homeUrl' => route('home')
        ]);
    }

    // ===================
    // HELPER METHODS
    // ===================

    private function calculateUserOnboardingProgress($user, $currentStep)
    {
        $totalSteps = 3; // Profile, Dietary, Interests
        return [
            'current' => $currentStep,
            'total' => $totalSteps,
            'percentage' => round(($currentStep / $totalSteps) * 100)
        ];
    }

    private function getStoreTypes()
    {
        return [
            'farm' => 'Farm',
            'poultry' => 'Poultry',
            'bakery' => 'Bakery',
            'grocery' => 'Grocery Store',
            'restaurant' => 'Restaurant',
            'coffee' => 'Coffee Shop',
        ];
    }

    private function getCommonAllergies()
    {
        return [
            'Tree nuts',
            'Peanuts',
            'Dairy/Lactose',
            'Gluten/Wheat',
            'Eggs',
            'Shellfish',
            'Fish',
            'Soy',
            'Sesame',
            'Sulfites',
            'Corn',
            'Strawberries',
        ];
    }

    private function getDietaryOptions()
    {
        return [
            'Vegetarian',
            'Vegan',
            'Pescatarian',
            'Keto',
            'Paleo',
            'Low Carb',
            'Gluten-Free',
            'Dairy-Free',
            'Kosher',
            'Halal',
            'Raw Food',
            'Mediterranean',
            'Intermittent Fasting',
            'Plant-Based',
        ];
    }

    private function getCuisineOptions()
    {
        return [
            'Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'Japanese',
            'French', 'Mediterranean', 'American', 'Korean', 'Vietnamese',
            'Middle Eastern', 'Greek', 'Spanish', 'German', 'Caribbean',
            'Ethiopian', 'Moroccan', 'Brazilian', 'Peruvian', 'Lebanese',
            'Turkish', 'Russian', 'Scandinavian', 'African'
        ];
    }

    private function getSpiceOptions()
    {
        return [
            'none' => 'No Spice',
            'mild' => 'Mild',
            'medium' => 'Medium',
            'hot' => 'Hot',
            'very_hot' => 'Very Hot'
        ];
    }

    private function getCookingLevels()
    {
        return [
            'beginner' => 'Beginner - Just starting out',
            'intermediate' => 'Intermediate - Comfortable with basics',
            'advanced' => 'Advanced - Skilled home cook',
            'professional' => 'Professional - Industry experience'
        ];
    }

    private function getInterestCategories()
    {
        return [
            'food_types' => [
                'Street Food',
                'Fine Dining',
                'Home Cooking',
                'Baking & Desserts',
                'BBQ & Grilling',
                'Healthy Eating',
                'International Cuisine',
                'Local Specialties',
                'Farm to Table',
                'Organic Foods',
                'Artisanal Products',
                'Seasonal Cooking'
            ],
            'activities' => [
                'Recipe Sharing',
                'Restaurant Reviews',
                'Food Photography',
                'Cooking Tutorials',
                'Food Events',
                'Wine/Beverage Pairing',
                'Food Challenges',
                'Meal Planning',
                'Food Blogging',
                'Cooking Classes',
                'Food Festivals',
                'Market Shopping'
            ],
        ];
    }

    private function getSocialOptions()
    {
        return [
            'Follow Food Bloggers',
            'Join Local Food Groups',
            'Share Meal Photos',
            'Rate & Review Places',
            'Get Food Recommendations',
            'Cooking Collaborations',
            'Food Discussions',
            'Recipe Exchanges',
            'Local Food Events',
            'Cooking Competitions'
        ];
    }

    private function getNotificationOptions()
    {
        return [
            'New Restaurants Nearby',
            'Food Events & Festivals',
            'Recipe Recommendations',
            'Price Alerts on Favorites',
            'Weekly Food Digest',
            'Friend Activity Updates',
            'Seasonal Food Tips',
            'Special Offers & Deals',
            'New Reviews on Followed Places',
            'Cooking Tips & Tricks'
        ];
    }
}