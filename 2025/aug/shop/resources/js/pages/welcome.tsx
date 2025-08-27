import { Link } from '@inertiajs/react';

export default function Welcome() {
    return (
        <div className="p-6 text-center">
            <h2 className="mb-4 text-2xl font-bold">Welcome Page 👋</h2>
            <p className="mb-6">This is your landing page.</p>

            {/* Link to Todos */}
            <Link href={route('todos.index')} className="rounded bg-blue-500 px-4 py-2 text-white shadow">
                Go to Todos
            </Link>
        </div>
    );
}
