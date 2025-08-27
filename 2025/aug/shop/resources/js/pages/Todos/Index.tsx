import { Head, Link, useForm } from '@inertiajs/react';
import { Check, Edit2, Filter, Home, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

// Types
interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
}

interface TodosIndexProps {
    todos: Todo[];
}

export default function TodosIndex({ todos = [] }: TodosIndexProps) {
    const [showForm, setShowForm] = useState(false);
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
    const [filter, setFilter] = useState<'all' | 'completed' | 'pending'>('all');

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

    const handleEdit = (todo: Todo) => {
        setData({
            title: todo.title,
            description: todo.description || '',
        });
        setEditingTodo(todo);
        setShowForm(true);
    };

    const handleToggle = (todo: Todo) => {
        patch(route('todos.toggle', todo.id));
    };

    const handleDelete = (todo: Todo) => {
        if (confirm('Are you sure you want to delete this todo?')) {
            destroy(route('todos.destroy', todo.id));
        }
    };

    const cancelEdit = () => {
        reset();
        setEditingTodo(null);
        setShowForm(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    // Filter todos based on current filter
    const filteredTodos = todos.filter((todo) => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'pending') return !todo.completed;
        return true; // 'all'
    });

    const completedCount = todos.filter((todo) => todo.completed).length;
    const pendingCount = todos.length - completedCount;

    return (
        <div className="min-h-screen bg-gray-50">
            <Head title="My Todos" />

            {/* Header */}
            <header className="border-b bg-white shadow-sm">
                <div className="mx-auto max-w-4xl px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">My Todos</h1>
                            <p className="text-gray-600">
                                {todos.length} total • {completedCount} completed • {pendingCount} pending
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link href={route('home')} className="flex items-center gap-2 font-medium text-blue-600 hover:text-blue-700">
                                <Home className="h-4 w-4" />
                                Back to Home
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
                {/* Add New Todo */}
                <div className="mb-8 rounded-xl bg-white p-6 shadow-sm">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-gray-900">{editingTodo ? 'Edit Todo' : 'Add New Todo'}</h2>
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
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSubmit}
                                    disabled={processing}
                                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                                >
                                    {editingTodo ? 'Update Todo' : 'Create Todo'}
                                </button>
                                <button
                                    onClick={cancelEdit}
                                    className="rounded-lg bg-gray-200 px-4 py-2 font-medium text-gray-800 transition-colors hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Filter Controls */}
                <div className="mb-6 flex items-center gap-4">
                    <Filter className="h-5 w-5 text-gray-600" />
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                                filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            All ({todos.length})
                        </button>
                        <button
                            onClick={() => setFilter('completed')}
                            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                                filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            Completed ({completedCount})
                        </button>
                        <button
                            onClick={() => setFilter('pending')}
                            className={`rounded-lg px-4 py-2 font-medium transition-colors ${
                                filter === 'pending' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                            }`}
                        >
                            Pending ({pendingCount})
                        </button>
                    </div>
                </div>

                {/* Todo List */}
                <div className="space-y-4">
                    {filteredTodos.length === 0 ? (
                        <p className="py-8 text-center text-gray-600">No todos found.</p>
                    ) : (
                        filteredTodos.map((todo) => (
                            <div
                                key={todo.id}
                                className="flex items-center justify-between rounded-xl bg-white p-6 shadow-sm transition-colors hover:bg-gray-50"
                            >
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => handleToggle(todo)}
                                        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                                            todo.completed ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
                                        }`}
                                    >
                                        {todo.completed && <Check className="h-4 w-4 text-white" />}
                                    </button>
                                    <div>
                                        <h3 className={`text-lg font-medium ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                                            {todo.title}
                                        </h3>
                                        {todo.description && <p className="text-sm text-gray-600">{todo.description}</p>}
                                        <p className="mt-1 text-sm text-gray-500">
                                            Created: {formatDate(todo.created_at)}
                                            {todo.updated_at !== todo.created_at && <span> • Updated: {formatDate(todo.updated_at)}</span>}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleEdit(todo)} className="p-2 text-blue-600 transition-colors hover:text-blue-700">
                                        <Edit2 className="h-5 w-5" />
                                    </button>
                                    <button onClick={() => handleDelete(todo)} className="p-2 text-red-600 transition-colors hover:text-red-700">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
}
