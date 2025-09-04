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
        'password',
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
