<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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

        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('home');
    }

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

        // Redirect to setup completion page instead of direct dashboard
        return redirect()->route('onboarding.setupComplete', ['store' => $store->id]);
    }

    // New method for setup completion page
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
}