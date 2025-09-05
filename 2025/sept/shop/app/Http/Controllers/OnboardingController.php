<?php

namespace App\Http\Controllers;

use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    public function start()
    {
        return inertia('Onboarding/Start');
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

        // Redirect to user onboarding flow instead of completing immediately
        return redirect()->route('onboarding.userProfile');
    }

    // ===================
    // SELLER ONBOARDING
    // ===================

    // Step 1: Store setup form
    public function storeSetup()
    {
        return inertia('Onboarding/StoreSetup');
    }

    // Step 2: Save store details
    public function saveStore(Request $request)
    {
        $request->validate([
            'name'      => 'required|string|max:255',
            'type'      => 'required|string|max:255',
            'location'  => 'required|string|max:255',
            'latitude'  => 'nullable|numeric|between:-90,90',
            'longitude' => 'nullable|numeric|between:-180,180',
            'logo'      => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user = Auth::user();
        
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('store-logos', 'public');
        }

        $store = Store::create([
            'user_id'   => $user->id,
            'name'      => $request->name,
            'type'      => $request->type,
            'location'  => $request->location,
            'latitude'  => $request->latitude,
            'longitude' => $request->longitude,
            'logo'      => $logoPath,
        ]);

        $user->onboarding_complete = true;
        $user->save();

        // Redirect based on store type
        return redirect()->route('onboarding.setupComplete', ['store' => $store->id]);
    
    }
    public function setupComplete(Store $store)
    {
        // Make sure the store belongs to the authenticated user
        if ($store->user_id !== Auth::id()) {
            abort(403);
        }

        return inertia('Onboarding/SetupComplete', [
            'store' => $store
        ]);
    }

    // ===================
    // USER ONBOARDING
    // ===================

    // Step 1: Collect user profile information
    public function userProfile()
    {
        $user = Auth::user();
        
        return inertia('Onboarding/UserProfile', [
            'user' => $user
        ]);
    }

    // Step 2: Save profile and go to dietary preferences
    public function saveUserProfile(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'bio' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
        ]);

        $user = Auth::user();
        
        $user->update([
            'username' => $request->username,
            'bio' => $request->bio,
            'location' => $request->location,
        ]);

        return redirect()->route('onboarding.dietaryPreferences');
    }

    // Step 3: Collect dietary preferences and allergies
    public function dietaryPreferences()
    {
        $user = Auth::user();
        
        return inertia('Onboarding/DietaryPreferences', [
            'user' => $user,
            'commonAllergies' => $this->getCommonAllergies(),
            'dietaryOptions' => $this->getDietaryOptions()
        ]);
    }

    // Step 4: Save dietary preferences
    public function saveDietaryPreferences(Request $request)
    {
        $request->validate([
            'allergies' => 'nullable|array',
            'allergies.*' => 'string|max:100',
            'dietary_restrictions' => 'nullable|array',
            'dietary_restrictions.*' => 'string|max:100',
            'favorite_cuisines' => 'nullable|array',
            'favorite_cuisines.*' => 'string|max:100',
            'spice_tolerance' => 'nullable|in:none,mild,medium,hot,very_hot',
        ]);

        $user = Auth::user();
        
        $user->update([
            'allergies' => $request->allergies ?? [],
            'dietary_restrictions' => $request->dietary_restrictions ?? [],
            'favorite_cuisines' => $request->favorite_cuisines ?? [],
            'spice_tolerance' => $request->spice_tolerance,
        ]);

        return redirect()->route('onboarding.interests');
    }

    // Step 5: Food interests and social preferences
    public function interests()
    {
        $user = Auth::user();
        
        return inertia('Onboarding/Interests', [
            'user' => $user,
            'interestCategories' => $this->getInterestCategories()
        ]);
    }

    // Step 6: Save interests and complete onboarding
    public function saveInterests(Request $request)
    {
        $request->validate([
            'food_interests' => 'nullable|array',
            'food_interests.*' => 'string|max:100',
            'cooking_level' => 'nullable|in:beginner,intermediate,advanced,professional',
            'social_preferences' => 'nullable|array',
            'social_preferences.*' => 'string|max:100',
            'notification_preferences' => 'nullable|array',
            'notification_preferences.*' => 'string|max:100',
        ]);

        $user = Auth::user();
        
        $user->update([
            'food_interests' => $request->food_interests ?? [],
            'cooking_level' => $request->cooking_level,
            'social_preferences' => $request->social_preferences ?? [],
            'notification_preferences' => $request->notification_preferences ?? [],
            'onboarding_complete' => true,
        ]);

        return redirect()->route('home');
    }

    // ===================
    // HELPER METHODS
    // ===================

    private function getCommonAllergies()
    {
        return [
            'Nuts (Tree nuts)',
            'Peanuts',
            'Dairy/Lactose',
            'Gluten/Wheat',
            'Eggs',
            'Shellfish',
            'Fish',
            'Soy',
            'Sesame',
            'Sulfites'
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
            'Mediterranean'
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
                'Local Specialties'
            ],
            'activities' => [
                'Recipe Sharing',
                'Restaurant Reviews',
                'Food Photography',
                'Cooking Tutorials',
                'Food Events',
                'Wine/Beverage Pairing',
                'Food Challenges',
                'Meal Planning'
            ],
            'social_features' => [
                'Follow Food Bloggers',
                'Join Local Food Groups',
                'Share Meal Photos',
                'Rate & Review',
                'Food Recommendations',
                'Cooking Collaborations'
            ]
        ];
    }
}