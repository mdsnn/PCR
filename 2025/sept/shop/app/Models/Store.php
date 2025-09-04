<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;


    protected $fillable = [
        'user_id',
        'name',
        'type',
        'location',
    ];

    /**
     * Relationship: A store belongs to a user (the owner).
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
