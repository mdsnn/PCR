// resources/js/Pages/Home.tsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

export default function Home({ auth, flash }: PageProps) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />

            <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900">
                    {flash.message && (
                        <div className="mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">{flash.message}</div>
                    )}

                    <h1 className="mb-4 text-2xl font-bold">Welcome to your Dashboard!</h1>
                    <p className="text-gray-600">
                        You are successfully logged in as <strong>{auth.user?.name}</strong>.
                    </p>

                    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        <div className="rounded-lg bg-blue-50 p-6">
                            <h3 className="text-lg font-semibold text-blue-900">Profile</h3>
                            <p className="text-blue-700">Manage your account settings</p>
                        </div>

                        <div className="rounded-lg bg-green-50 p-6">
                            <h3 className="text-lg font-semibold text-green-900">Projects</h3>
                            <p className="text-green-700">View and manage your projects</p>
                        </div>

                        <div className="rounded-lg bg-purple-50 p-6">
                            <h3 className="text-lg font-semibold text-purple-900">Analytics</h3>
                            <p className="text-purple-700">View your performance metrics</p>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
