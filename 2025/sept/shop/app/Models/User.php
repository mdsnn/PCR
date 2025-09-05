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
        'bio',
        'location',
        'allergies',
        'dietary_restrictions',
        'favorite_cuisines',
        'spice_tolerance',
        'food_interests',
        'cooking_level',
        'social_preferences',
        'notification_preferences',
        'onboarding_complete',
        'is_seller',
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
    protected function casts(): array
    {
        return [
           'email_verified_at' => 'datetime',
           'password' => 'hashed',
           'is_seller' => 'boolean',
           'onboarding_complete' => 'boolean',
           'allergies' => 'array',
           'dietary_restrictions' => 'array',
           'favorite_cuisines' => 'array',
           'food_interests' => 'array',
           'social_preferences' => 'array',
           'notification_preferences' => 'array',
        ];
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
