<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureOnboardingComplete
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();
        
        // Allow if user is not authenticated (handled by auth middleware)
        if (!$user) {
            return $next($request);
        }

        // Skip onboarding check for onboarding routes, logout, and magic link routes
        $exemptRoutes = [
            'onboarding.*',
            'logout',
            'magic-link.*',
        ];

        foreach ($exemptRoutes as $pattern) {
            if ($request->routeIs($pattern)) {
                return $next($request);
            }
        }

        // Redirect to onboarding if not complete
        if (!$user->onboarding_complete) {
            return redirect()->route('onboarding.start');
        }

        return $next($request);
    }
}