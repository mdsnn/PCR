<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\MagicLink;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class MagicLinkController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function sendMagicLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->email;

        // Create or find user
        $user = User::firstOrCreate(
            ['email' => $email],
            ['name' => explode('@', $email)[0]] // Simple name from email
        );

        // Generate magic link
        $magicLink = MagicLink::generateForEmail($email);

        // Send email
        Mail::send('emails.magic-link', [
            'url' => route('magic-link.verify', ['token' => $magicLink->token])
        ], function ($message) use ($email) {
            $message->to($email)
                   ->subject('Your Magic Login Link');
        });

        return back()->with('success', 'Magic link sent to your email!');
    }

    public function verify($token)
    {
    $magicLink = MagicLink::where('token', $token)->first();

    if (!$magicLink || !$magicLink->isValid()) {
        throw ValidationException::withMessages([
            'token' => ['This login link is invalid or has expired.'],
        ]);
    }

    $user = User::where('email', $magicLink->email)->first();

    if (!$user) {
        throw ValidationException::withMessages([
            'token' => ['User not found.'],
        ]);
    }

    $magicLink->markAsUsed();
    Auth::login($user, true);

    // 🚀 Routing logic
    if (!$user->onboarding_complete) {
        return redirect()->route('onboarding.start');
    }

    if ($user->is_seller && $user->store) {
        return redirect()->route("dashboard.{$user->store->type}");
    }

    return redirect()->route('home');
    }


    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }
}
