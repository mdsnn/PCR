<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'profile_picture',
        'password',
        'onboarding_complete',
        'is_seller',
        'bio',
        'location',
        'allergies',
        'dietary_restrictions',
        'favorite_cuisines',
        'spice_tolerance',
        'food_interests',
        'cooking_level',
        'social_preferences',
        'notification_preferences'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_seller' => 'boolean',
        'onboarding_complete' => 'boolean',
        // Cast JSON fields to arrays
        'allergies' => 'array',
        'dietary_restrictions' => 'array',
        'favorite_cuisines' => 'array',
        'food_interests' => 'array',
        'social_preferences' => 'array',
        'notification_preferences' => 'array',
    ];

    /**
     * Relationships
     */
    public function store()
    {
        return $this->hasOne(Store::class);
    }

    /**
     * Accessor methods for better data handling
     */
    public function hasAllergy($allergy)
    {
        return in_array($allergy, $this->allergies ?? []);
    }

    public function hasDietaryRestriction($restriction)
    {
        return in_array($restriction, $this->dietary_restrictions ?? []);
    }

    public function getSpiceToleranceTextAttribute()
    {
        $levels = [
            'none' => 'No Spice',
            'mild' => 'Mild',
            'medium' => 'Medium',
            'hot' => 'Hot',
            'very_hot' => 'Very Hot'
        ];

        return $levels[$this->spice_tolerance] ?? 'Not specified';
    }

    public function getProfilePictureUrlAttribute()
    {
        if ($this->profile_picture) {
            return Storage::disk('public')->url($this->profile_picture);
        }
        
        // Return a default avatar or initials-based avatar
        return $this->generateAvatarUrl();
    }

    /**
     * Check if user has completed their profile setup
     */
    public function hasCompletedProfile()
    {
        if ($this->is_seller) {
            return $this->onboarding_complete && $this->store()->exists();
        }
        
        return $this->onboarding_complete && !empty($this->username);
    }

    /**
     * Determine where to redirect user after login
     */
    public function redirectAfterLogin()
    {
        // Step 1: Check if onboarding is incomplete
        if (!$this->onboarding_complete) {
            return route('onboarding.start');
        }

        // Step 2: Handle seller redirection
        if ($this->is_seller) {
            // Check if seller has a store
            if ($this->store) {
                $storeType = $this->store->type;
                
                // Redirect to specific dashboard if store type is supported
                if (in_array($storeType, ['farm', 'poultry', 'bakery', 'grocery', 'restaurant', 'coffee'])) {
                    return route("dashboard.{$storeType}");
                }
                
                // Fallback to default dashboard for unknown store types
                return route("dashboard.default");
            } else {
                // Seller without store - redirect back to store setup
                return route('onboarding.storeSetup');
            }
        }

        // Step 3: Handle buyer redirection
        // If buyer just completed onboarding, show welcome screen briefly
        if ($this->wasRecentlyCreated || session('show_welcome')) {
            session()->forget('show_welcome');
            return route('onboarding.welcome');
        }

        // Default buyer redirect to home
        return route('home');
    }

    /**
     * Generate a default avatar URL (could be initials-based or default image)
     */
    private function generateAvatarUrl()
    {
        // You can implement this to generate initials-based avatars
        // or return a default avatar image
        $initials = strtoupper(substr($this->name, 0, 1));
        return "https://ui-avatars.com/api/?name=" . urlencode($this->name) . "&color=7F9CF5&background=EBF4FF&size=200";
    }

    /**
     * Get user's display name (username or name)
     */
    public function getDisplayNameAttribute()
    {
        return $this->username ?: $this->name;
    }

    /**
     * Check if user has specific food interest
     */
    public function hasInterest($interest)
    {
        return in_array($interest, $this->food_interests ?? []);
    }

    /**
     * Get user's cooking level display text
     */
    public function getCookingLevelTextAttribute()
    {
        $levels = [
            'beginner' => 'Beginner Cook',
            'intermediate' => 'Intermediate Cook',
            'advanced' => 'Advanced Cook',
            'professional' => 'Professional Chef'
        ];

        return $levels[$this->cooking_level] ?? 'Not specified';
    }

    /**
     * Scope for filtering users by dietary restrictions
     */
    public function scopeWithDietaryRestriction($query, $restriction)
    {
        return $query->whereJsonContains('dietary_restrictions', $restriction);
    }

    /**
     * Scope for filtering users by location
     */
    public function scopeInLocation($query, $location)
    {
        return $query->where('location', 'like', "%{$location}%");
    }
}