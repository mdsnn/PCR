import { Head, Link, useForm } from '@inertiajs/react';
import { Check, Clock, Edit2, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function Home({ user, todos = [] }) {
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        patch,
        delete: destroy,
        processing,
        errors,
        reset,
    } = useForm({
        title: '',
        description: '',
    });

    const handleSubmit = () => {
        if (editingTodo) {
            put(route('todos.update', editingTodo.id), {
                onSuccess: () => {
                    reset();
                    setEditingTodo(null);
                    setShowForm(false);
                },
            });
        } else {
            post(route('todos.store'), {
                onSuccess: () => {
                    reset();
                    setShowForm(false);
                },
            });
        }
    };

    const handleEdit = (todo) => {
        setData({
            title: todo.title,
            description: todo.description || '',
        });
        setEditingTodo(todo);
        setShowForm(true);
    };

    const handleToggle = (todo) => {
        patch(route('todos.toggle', todo.id));
    };

    const handleDelete = (todo) => {
        if (confirm('Are you sure you want to delete this todo?')) {
            destroy(route('todos.destroy', todo.id));
        }
    };

    const cancelEdit = () => {
        reset();
        setEditingTodo(null);
        setShowForm(false);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="Home" />

            {/* Header */}
            <header className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-4xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
                            <p className="text-gray-600">Manage your todos and stay productive</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={route('todos.index')} className="font-medium text-blue-600 hover:text-blue-700">
                                View All Todos
                            </Link>
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="rounded-lg bg-red-600 px-4 py-2 font-medium text-white transition-colors hover:bg-red-700"
                            >
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-4xl px-4 py-8">
                {/* Quick Add Todo */}
                <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">Quick Add Todo</h2>
                        {!showForm && (
                            <button
                                onClick={() => setShowForm(true)}
                                className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                            >
                                <Plus className="h-4 w-4" />
                                Add Todo
                            </button>
                        )}
                    </div>

                    {showForm && (
                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    placeholder="Todo title..."
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                            </div>
                            <div>
                                <textarea
                                    placeholder="Description (optional)..."
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={3}
                                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="rounded-lg bg-blue-600 px-6 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
                                >
                                    {processing ? 'Saving...' : editingTodo ? 'Update Todo' : 'Add Todo'}
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="rounded-lg bg-gray-300 px-6 py-2 font-medium text-gray-700 transition-colors hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Recent Todos Timeline */}
                <div className="overflow-hidden rounded-xl bg-white shadow-sm">
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h2 className="flex items-center gap-2 text-xl font-semibold text-gray-900">
                            <Clock className="h-5 w-5" />
                            Recent Todos
                        </h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                        {todos.map((todo) => (
                            <div key={todo.id} className="p-6 transition-colors hover:bg-gray-50">
                                <div className="flex items-start gap-4">
                                    <button
                                        onClick={() => handleToggle(todo)}
                                        className={`mt-1 flex h-6 w-6 items-center justify-center rounded-full border-2 transition-colors ${
                                            todo.completed ? 'border-green-600 bg-green-600 text-white' : 'border-gray-300 hover:border-green-500'
                                        }`}
                                    >
                                        {todo.completed && <Check className="h-4 w-4" />}
                                    </button>

                                    <div className="min-w-0 flex-1">
                                        <h3 className={`font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                            {todo.title}
                                        </h3>
                                        {todo.description && (
                                            <p className={`mt-1 text-sm ${todo.completed ? 'text-gray-400' : 'text-gray-600'}`}>{todo.description}</p>
                                        )}
                                        <p className="mt-2 text-xs text-gray-400">Created {formatDate(todo.created_at)}</p>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(todo)} className="p-2 text-gray-400 transition-colors hover:text-blue-600">
                                            <Edit2 className="h-4 w-4" />
                                        </button>
                                        <button onClick={() => handleDelete(todo)} className="p-2 text-gray-400 transition-colors hover:text-red-600">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {todos.length > 0 && (
                    <div className="mt-6 text-center">
                        <Link href={route('todos.index')} className="font-medium text-blue-600 hover:text-blue-700">
                            View all todos →
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}
