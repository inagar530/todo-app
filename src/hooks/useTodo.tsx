import { useEffect, useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category:
    | "general"
    | "work"
    | "personal"
    | "shopping"
    | "health"
    | "learning";
  dueDate: number | null;
  createdAt: string;
  notes: string | "";
}

export type NewTodo = Omit<Todo, "id" | "completed" | "createdAt">;
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<
    "all" | "completed" | "active" | "overdue"
  >("all");

  // Load from localStroage
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  //  Saved to localStroage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //   Add new todo
  const addtodo = (newTodo: NewTodo) => {
    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: newTodo.text,
        completed: false,
        priority: newTodo.priority || "medium",
        category: newTodo.category || "general",
        dueDate: newTodo.dueDate || null,
        createdAt: new Date().toISOString(),
        notes: newTodo.notes || "",
      },
    ]);
  };

  // Update todo
  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  // delete Todo
  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // Delete completed todo
  const deleteCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Toggle Todo
  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Toggle all todo
  const toggleAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos((prev) =>
      prev.map((todo) => ({ ...todo, completed: !allCompleted }))
    );
  };

  const filteredTodo = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    if (filter === "overdue") {
      return (
        todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
      );
    }
    return true;
  });

  return {
    todos: filteredTodo,
    allTodos: todos,
    addtodo,
    filter,
    setFilter,
    updateTodo,
    deleteTodo,
    deleteCompleted,
    toggleTodo,
    toggleAll,
  };
}
