import { Head, useForm } from '@inertiajs/react';

export default function Login({ flash }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('magic-link.send'));
    };

    return (
        <>
            <Head title="Login" />

            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-full max-w-md space-y-8 p-8">
                    <div className="rounded-2xl bg-white p-8 shadow-xl">
                        {/* Header */}
                        <div className="mb-8 text-center">
                            <div className="mb-4 text-4xl">✨</div>
                            <h2 className="mb-2 text-3xl font-bold text-gray-900">Welcome Back</h2>
                            <p className="text-gray-600">Enter your email to receive a magic login link</p>
                        </div>

                        {/* Success Message */}
                        {flash?.success && (
                            <div className="mb-6 rounded-lg border border-green-200 bg-green-50 p-4">
                                <div className="flex items-center">
                                    <div className="mr-3 text-green-500">📧</div>
                                    <div>
                                        <p className="font-medium text-green-800">{flash.success}</p>
                                        <p className="mt-1 text-sm text-green-700">Check your inbox and click the link to login</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="flex w-full items-center justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? (
                                    <>
                                        <svg
                                            className="mr-3 -ml-1 h-5 w-5 animate-spin text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Sending Magic Link...
                                    </>
                                ) : (
                                    <>
                                        <span className="mr-2">🔗</span>
                                        Send Magic Link
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
