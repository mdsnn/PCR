// app/Http/Controllers/MagicLinkController.php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class MagicLinkController extends Controller
{
    public function send(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $token = Str::random(64);
        $expiresAt = Carbon::now()->addMinutes(15);

        DB::table('login_tokens')->insert([
            'email' => $request->email,
            'token' => $token,
            'expires_at' => $expiresAt,
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $link = url("/magic-login/{$token}");

        Mail::raw("Click to login: {$link}", function ($message) use ($request) {
            $message->to($request->email)->subject('Your magic login link');
        });

        return back()->with('status', 'We sent you a magic link!');
    }

    public function login($token)
    {
        $record = DB::table('login_tokens')->where('token', $token)->first();

        if (! $record || Carbon::parse($record->expires_at)->isPast()) {
            return redirect('/login')->withErrors(['email' => 'Link expired or invalid']);
        }

        $user = User::firstOrCreate(['email' => $record->email]);

        Auth::login($user);

        DB::table('login_tokens')->where('id', $record->id)->delete();

        return redirect('/dashboard');
    }
}
