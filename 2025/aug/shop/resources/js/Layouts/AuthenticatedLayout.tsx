// resources/js/Layouts/AuthenticatedLayout.tsx
import { PageProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    user: PageProps['auth']['user'];
}

export default function AuthenticatedLayout({ children, user }: Props) {
    const handleLogout = () => {
        router.post('/logout');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex items-center">
                            <Link href="/" className="text-xl font-semibold text-gray-900">
                                MyApp
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user?.name}!</span>
                            <button onClick={handleLogout} className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
            </main>
        </div>
    );
}
