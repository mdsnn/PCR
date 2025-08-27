<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        $todos = auth()->user()->todos()
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Todos/Index', [
            'todos' => $todos
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        auth()->user()->todos()->create([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => false,
        ]);

        return back()->with('message', 'Todo created successfully!');
    }

    public function update(Request $request, Todo $todo)
    {
        // Ensure user owns the todo
        if ($todo->user_id !== auth()->id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        $todo->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);

        return back()->with('message', 'Todo updated successfully!');
    }

    public function toggle(Todo $todo)
    {
        // Ensure user owns the todo
        if ($todo->user_id !== auth()->id()) {
            abort(403);
        }

        $todo->update([
            'completed' => !$todo->completed
        ]);

        return back()->with('message', 'Todo status updated!');
    }

    public function destroy(Todo $todo)
    {
        // Ensure user owns the todo
        if ($todo->user_id !== auth()->id()) {
            abort(403);
        }

        $todo->delete();

        return back()->with('message', 'Todo deleted successfully!');
    }
}