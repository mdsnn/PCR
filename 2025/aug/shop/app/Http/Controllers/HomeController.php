<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $todos = auth()->user()->todos()
            ->orderBy('created_at', 'desc')
            ->take(10) // Show latest 10 todos on home
            ->get();

        return Inertia::render('Home', [
            'user' => auth()->user(),
            'todos' => $todos,
        ]);
    }
}