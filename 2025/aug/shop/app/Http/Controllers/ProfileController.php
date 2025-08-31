<?php

namespace App\Http\Controllers;

use App\Models\Profile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProfileController extends Controller
{
    // Show logged-in user's profile
    public function show()
    {
        $user = Auth::user()->load('profile');
        return Inertia::render('Profile/Show', [
            'user' => $user,
        ]);
    }

    // Edit profile form
    public function edit()
    {
        $profile = Auth::user()->profile;
        return Inertia::render('Profile/Edit', [
            'profile' => $profile,
        ]);
    }

    // Save profile updates
    public function update(Request $request)
    {
        $request->validate([
            'username' => 'nullable|string|max:255|unique:profiles,username,' . Auth::id() . ',user_id',
            'bio' => 'nullable|string|max:500',
            'location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:20',
            'birthdate' => 'nullable|date',
            'avatar' => 'nullable|image|max:2048',
        ]);

        $profile = Auth::user()->profile ?? new Profile(['user_id' => Auth::id()]);

        // Handle avatar upload
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $profile->avatar = $path;
        }

        $profile->fill($request->only(['username','bio','location','phone','birthdate']));
        $profile->save();

        return redirect()->route('profile.show')->with('message', 'Profile updated successfully!');
    }

    public function public($username)
    {
    $profile = Profile::where('username', $username)
        ->with('user:id,name')
        ->firstOrFail();

    return Inertia::render('Profile/Public', [
        'profile' => $profile,
    ]);
    }
}
