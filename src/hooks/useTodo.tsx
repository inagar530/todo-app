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
  return {
    todos,
    addtodo,
  };
}
