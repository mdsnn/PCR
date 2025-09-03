namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OnboardingController extends Controller
{
    public function start()
    {
        return inertia('Onboarding/Start');
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
            return redirect()->route('onboarding.storeSetup');
        }

        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('home');
    }

    // Step 1: Store setup form
    public function storeSetup()
    {
        return inertia('Onboarding/StoreSetup');
    }

    // Step 2: Save store details
    public function saveStore(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $user = Auth::user();

        Store::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'type' => $request->type,
        ]);

        // Mark onboarding complete
        $user->onboarding_complete = true;
        $user->save();

        return redirect()->route('home');
    }
}
