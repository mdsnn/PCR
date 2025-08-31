<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade'); // linked to users
            $table->string('username')->unique()->nullable(); // public handle
            $table->string('bio')->nullable();
            $table->string('avatar')->nullable(); // profile image
            $table->string('location')->nullable();
            $table->string('phone')->nullable();
            $table->date('birthdate')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('profiles');
    }
};
