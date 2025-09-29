import { useEffect, useState } from "react";
import { Todo } from "../types/types";

export type NewTodo = Omit<Todo, "id" | "completed" | "createdAt">;
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<
    "all" | "completed" | "active" | "overdue"
  >("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"created" | "priority" | "dueDate">(
    "created"
  );

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

  const filteredTodo = todos
    .filter((todo) => {
      if (filter === "active") return !todo.completed;
      if (filter === "completed") return todo.completed;
      if (filter === "overdue") {
        return (
          todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed
        );
      }
      return true;
    })
    .filter(
      (todo) =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "priority") {
        const priorityOrder: Record<Todo["priority"], number> = {
          high: 3,
          medium: 2,
          low: 1,
        };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return {
    todos: filteredTodo,
    allTodos: todos,
    addtodo,
    filter,
    searchTerm,
    setSearchTerm,
    setFilter,
    sortBy,
    setSortBy,
    updateTodo,
    deleteTodo,
    deleteCompleted,
    toggleTodo,
    toggleAll,
  };
}
