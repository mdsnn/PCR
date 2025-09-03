<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Carbon\Carbon;

class MagicLink extends Model
{
    protected $fillable = ['email', 'token', 'expires_at', 'used_at'];

    protected $casts = [
        'expires_at' => 'datetime',
        'used_at' => 'datetime',
    ];

    public static function generateForEmail($email)
    {
        // Delete any existing magic links for this email
        static::where('email', $email)->delete();

        return static::create([
            'email' => $email,
            'token' => Str::random(64),
            'expires_at' => Carbon::now()->addMinutes(15), // 15 minutes expiry
        ]);
    }

    public function isValid()
    {
        return $this->expires_at->isFuture() && is_null($this->used_at);
    }

    public function markAsUsed()
    {
        $this->update(['used_at' => Carbon::now()]);
    }
}
