import { AuthPageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import { FormEvent, useState } from 'react';

export default function Register({ errors }: AuthPageProps) {
    const { data, setData, post, processing } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post('/register');
    };

    // toggle states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Floating circles data
    const circles = [
        { size: 200, top: '20%', left: '10%', delay: 0 },
        { size: 300, top: '60%', right: '15%', delay: 2 },
        { size: 150, bottom: '15%', left: '25%', delay: 4 },
    ];

    return (
        <>
            <Head title="Register" />

            {/* Background gradient */}
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
                        <h2 className="mb-6 text-center text-3xl font-extrabold text-white">POTBELLY ERA</h2>

                        <form className="space-y-5" onSubmit={handleSubmit}>
                            {/* Name */}
                            <div>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Your name"
                                    required
                                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-300">{errors.name}</p>}
                            </div>

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

                            {/* Password */}
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Password"
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
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="Confirm password"
                                    required
                                    className="w-full rounded-xl border border-white/30 bg-white/20 px-4 py-3 pr-10 text-white placeholder-gray-200 focus:border-green-400 focus:ring-green-400 focus:outline-none"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-200 hover:text-white"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>

                            {/* Submit */}
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                disabled={processing}
                                className="flex w-full justify-center rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-4 py-3 font-medium text-white shadow-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Sign Up'}
                            </motion.button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link href="/login" className="text-green-200 hover:text-white">
                                Already have an account? Sign in
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
