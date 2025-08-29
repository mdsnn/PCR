// resources/js/Pages/Auth/ForgotPassword.tsx
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/forgot-password'); // Laravel Fortify/Breeze default route
    };

    // Floating background circles
    const circles = [
        { size: 200, top: '20%', left: '10%', delay: 0 },
        { size: 300, top: '60%', right: '15%', delay: 2 },
        { size: 150, bottom: '15%', left: '25%', delay: 4 },
    ];

    return (
        <>
            <Head title="Forgot Password" />

            <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-green-500 to-green-700 px-4 py-12 sm:px-6 lg:px-8">
                {/* Floating circles */}
                {circles.map((c, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full bg-white/10 backdrop-blur-xl"
                        style={{
                            width: c.size,
                            height: c.size,
                            top: c.top,
                            left: c.left,
                            right: c.right,
                            bottom: c.bottom,
                        }}
                        animate={{ y: [0, -30, 0], scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 6, repeat: Infinity, delay: c.delay }}
                    />
                ))}

                {/* Card */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 w-full max-w-md"
                >
                    <div className="rounded-2xl bg-white/20 p-8 shadow-2xl backdrop-blur-lg">
                        <h2 className="mb-6 text-center text-3xl font-extrabold text-white">Reset Password</h2>

                        {status && <div className="mb-4 rounded-lg border border-green-400 bg-green-100 px-4 py-3 text-green-700">{status}</div>}

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Email */}
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    required
                                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white shadow-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50"
                            >
                                {processing ? 'Sending...' : 'Send Password Reset Link'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
