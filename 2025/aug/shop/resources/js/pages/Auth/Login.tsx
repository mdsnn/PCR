// resources/js/Pages/Auth/Login.tsx
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function Login() {
  const { data, setData, post, processing, errors } = useForm({ email: '' });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('magic.send'));
  };

  return (
    <>
      <Head title="Login" />
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg"
        >
          <h2 className="mb-6 text-center text-2xl font-bold">
            Continue with Email
          </h2>

          <form onSubmit={submit} className="space-y-4">
            <input
              type="email"
              value={data.email}
              onChange={e => setData('email', e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-xl border px-4 py-3"
              required
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}

            <button
              type="submit"
              disabled={processing}
              className="w-full rounded-xl bg-blue-600 px-4 py-3 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Send Magic Link
            </button>
          </form>
        </motion.div>
      </div>
    </>
  );
}
