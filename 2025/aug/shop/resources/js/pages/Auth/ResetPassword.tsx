// resources/js/Pages/Auth/ResetPassword.tsx
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

export default function ResetPassword({ token, email }: { token: string; email: string }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email,
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/reset-password'); // Laravel Fortify/Breeze default route
    };

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Floating background circles
    const circles = [
        { size: 200, top: '20%', left: '10%', delay: 0 },
        { size: 300, top: '60%', right: '15%', delay: 2 },
        { size: 150, bottom: '15%', left: '25%', delay: 4 },
    ];

    return (
        <>
            <Head title="Reset Password" />

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
                        <h2 className="mb-6 text-center text-3xl font-extrabold text-white">Create New Password</h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Email (readonly) */}
                            <div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={data.email}
                                    readOnly
                                    className="w-full rounded-xl border border-white/30 bg-white/30 px-4 py-3 text-white placeholder-gray-200 focus:outline-none"
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-300">{errors.email}</p>}
                            </div>

                            {/* Password */}
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="New Password"
                                    required
                                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 pr-10 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password && <p className="mt-1 text-sm text-red-300">{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div className="relative">
                                <input
                                    id="password_confirmation"
                                    name="password_confirmation"
                                    type={showConfirm ? 'text' : 'password'}
                                    placeholder="Confirm New Password"
                                    required
                                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 pr-10 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirm(!showConfirm)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                                >
                                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                                {errors.password_confirmation && <p className="mt-1 text-sm text-red-300">{errors.password_confirmation}</p>}
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white shadow-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50"
                            >
                                {processing ? 'Resetting...' : 'Reset Password'}
                            </motion.button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
