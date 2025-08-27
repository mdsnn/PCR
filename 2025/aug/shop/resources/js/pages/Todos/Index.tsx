import { useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

// Define the Todo type
interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

// Define the component props type
interface TodosProps {
    todos: Todo[];
}

// Define the form data type
interface TodoFormData {
    title: string;
}

export default function Todos({ todos }: TodosProps) {
    const { data, setData, post, reset } = useForm<TodoFormData>({ title: '' });

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('todos.store'), {
            onSuccess: () => reset('title'),
        });
    };

    return (
        <div className="mx-auto max-w-md p-6">
            <h1 className="mb-4 text-2xl font-bold">Todo App ✅</h1>

            {/* Add new todo */}
            <form onSubmit={submit} className="mb-4 flex gap-2">
                <input
                    type="text"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="flex-1 rounded border px-2 py-1"
                    placeholder="New task..."
                />
                <button type="submit" className="rounded bg-blue-500 px-3 py-1 text-white">
                    Add
                </button>
            </form>

            {/* Todo list */}
            <ul className="space-y-2">
                {todos.map((todo: Todo) => (
                    <li key={todo.id} className="flex items-center justify-between rounded border p-2">
                        <div className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : ''}`}>{todo.title}</div>
                        <div className="flex gap-2">
                            <form method="post" action={route('todos.toggle', todo.id)}>
                                <input type="hidden" name="_method" value="patch" />
                                <button className="rounded bg-yellow-400 px-2 py-1 text-sm">{todo.completed ? 'Undo' : 'Done'}</button>
                            </form>
                            <form method="post" action={route('todos.destroy', todo.id)}>
                                <input type="hidden" name="_method" value="delete" />
                                <button className="rounded bg-red-500 px-2 py-1 text-sm text-white">Delete</button>
                            </form>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
