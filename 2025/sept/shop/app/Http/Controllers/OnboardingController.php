<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    // Step 0: Welcome/start page
    public function start()
    {
        return Inertia::render('Onboarding/Start');
    }

    // Step 1: Choose role (buyer/seller)
    public function chooseRole(Request $request)
    {
        $request->validate([
            'role' => 'required|in:buyer,seller'
        ]);

        $user = Auth::user();

        if ($request->role === 'seller') {
            $user->is_seller = true;
            $user->save();

            // ensure store record exists for seller
            $store = Store::firstOrCreate(
                ['user_id' => $user->id],
                ['setup_step' => 1]
            );

            return redirect()->route('onboarding.storeSetup');
        }

        // if buyer → finish onboarding
        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('home');
    }

    // Step 2: Show store setup wizard (persistent)
    public function storeSetup(Request $request)
    {
        $store = Store::firstOrCreate(
            ['user_id' => $request->user()->id],
            ['setup_step' => 1]
        );

        return Inertia::render('Onboarding/StoreSetup', [
            'store' => $store
        ]);
    }

    // Step 3: Save step progress
    public function saveStoreStep(Request $request)
    {
        $store = Store::where('user_id', $request->user()->id)->firstOrFail();

        $store->fill($request->only(['name','type','latitude','longitude']));
        $store->setup_step = $request->step;

        // if last step → mark complete
        if ($request->step == 3 && $request->completed) {
            $store->setup_complete = true;

            // mark user onboarding as complete
            $user = Auth::user();
            $user->onboarding_complete = true;
            $user->save();
        }

        $store->save();

        return back()->with('success', 'Progress saved!');
    }
}
