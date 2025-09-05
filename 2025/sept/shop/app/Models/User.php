<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

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

    // You can add accessor methods for better data handling
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
    public function store()
    {
        return $this->hasOne(Store::class);
    }
    public function redirectAfterLogin()
    {
        // Step 1: Onboarding check
        if (!$this->onboarding_complete) {
            return route('onboarding.start');
        }

        // Step 2: Seller check
        if ($this->is_seller && $this->store) {
            $type = $this->store->type;

            if (in_array($type, ['farm','poultry','bakery','grocery','restaurant','coffee'])) {
                return route("dashboard.{$type}");
            }

            // fallback dashboard for unknown store types
            return route("dashboard.default");
        }

        // Step 3: Default buyer redirect
        return route('home');
    }
}

