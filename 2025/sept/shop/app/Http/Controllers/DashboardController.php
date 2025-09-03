<?php



namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function farm() {
        return Inertia::render('Dashboard/Farm');
    }

    public function poultry() {
        return Inertia::render('Dashboard/Poultry');
    }

    public function bakery() {
        return Inertia::render('Dashboard/Bakery');
    }

    public function grocery() {
        return Inertia::render('Dashboard/Grocery');
    }

    public function restaurant() {
        return Inertia::render('Dashboard/Restaurant');
    }

    public function coffee() {
        return Inertia::render('Dashboard/Coffee');
    }
}
