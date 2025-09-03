namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    public function start()
    {
        return inertia('Onboarding/Start'); // Vue page
    }

    public function chooseRole(Request $request)
    {
        $request->validate([
            'role' => 'required|in:buyer,seller'
        ]);

        $user = Auth::user();

        if ($request->role === 'seller') {
            $user->is_seller = true;
            $user->save();
            return redirect()->route('onboarding.storeSetup'); // next step
        }

        // If buyer, mark onboarding complete immediately
        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('home');
    }

    public function complete()
    {
        $user = Auth::user();
        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('home');
    }
}
