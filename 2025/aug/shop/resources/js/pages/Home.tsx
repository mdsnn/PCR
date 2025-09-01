import { Head, router, usePage } from '@inertiajs/react';

export default function Home() {
    const { auth } = usePage().props;

    const handleLogout = () => {
        router.post(route('logout'));
    };

    return (
        <>
            <Head title="Home" />

            <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
                {/* Navigation */}
                <nav className="border-b bg-white shadow-sm">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <h1 className="text-xl font-bold text-gray-900">✨ MagicAuth App</h1>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700">👋 Hello, {auth.user.name}!</span>
                                <button
                                    onClick={handleLogout}
                                    className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-12 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-900">🎉 Welcome to Your Dashboard!</h1>
                        <p className="mx-auto max-w-2xl text-xl text-gray-600">
                            You've successfully logged in using magic link authentication. No passwords required! 🚀
                        </p>
                    </div>

                    {/* Feature Cards */}
                    <div className="mb-12 grid gap-8 md:grid-cols-3">
                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="text-center">
                                <div className="mb-4 text-3xl">🔐</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Passwordless</h3>
                                <p className="text-gray-600">
                                    No more forgotten passwords or security breaches. Just secure, magic link authentication.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="text-center">
                                <div className="mb-4 text-3xl">⚡</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Fast Login</h3>
                                <p className="text-gray-600">Login in seconds with just one click. No typing, no remembering, just magic.</p>
                            </div>
                        </div>

                        <div className="rounded-xl bg-white p-6 shadow-lg transition-shadow hover:shadow-xl">
                            <div className="text-center">
                                <div className="mb-4 text-3xl">🛡️</div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900">Secure</h3>
                                <p className="text-gray-600">Links expire in 15 minutes and can only be used once. Your security is our priority.</p>
                            </div>
                        </div>
                    </div>

                    {/* User Info Panel */}
                    <div className="mx-auto max-w-2xl rounded-xl bg-white p-8 shadow-lg">
                        <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">Your Account Details</h2>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-gray-200 py-3">
                                <span className="font-medium text-gray-700">Name:</span>
                                <span className="text-gray-900">{auth.user.name}</span>
                            </div>

                            <div className="flex items-center justify-between border-b border-gray-200 py-3">
                                <span className="font-medium text-gray-700">Email:</span>
                                <span className="text-gray-900">{auth.user.email}</span>
                            </div>

                            <div className="flex items-center justify-between py-3">
                                <span className="font-medium text-gray-700">Authentication:</span>
                                <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                                    ✅ Magic Link Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="mt-12 text-center">
                        <p className="mb-4 text-gray-600">Ready to build something amazing? 🚀</p>
                        <div className="space-x-4">
                            <button className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                                Get Started
                            </button>
                            <button className="inline-flex items-center rounded-md border border-gray-300 bg-white px-6 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
                                Learn More
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
