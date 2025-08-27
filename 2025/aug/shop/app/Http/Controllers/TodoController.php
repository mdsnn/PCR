<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    public function index()
    {
        return Inertia::render('Todos/Index', [
            'todos' => Todo::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate(['title' => 'required|string|max:255']);
        Todo::create(['title' => $request->title]);
        return redirect()->route('todos.index');
    }

    public function toggle(Todo $todo)
    {
        $todo->update(['completed' => !$todo->completed]);
        return redirect()->route('todos.index');
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect()->route('todos.index');
    }
}
