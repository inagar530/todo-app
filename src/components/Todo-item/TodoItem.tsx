import React, { useState } from "react";

// Define the Todo type
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "high" | "medium" | "low";
  category:
    | "general"
    | "work"
    | "personal"
    | "shopping"
    | "health"
    | "learning";
  dueDate?: string | null;
  notes?: string;
}
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, updates: Partial<Todo>) => void;
}
function TodoItem({ todo, onToggle, onDelete, onUpdate }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => onDelete(todo.id), 300);
  };

  const handleEdit = () => {
    if (isEditing && editText.trim() !== todo.text) {
      onUpdate(todo.id, { text: editText.trim() });
    }
    setIsEditing(!isEditing);
  };

  const priorityColors = {
    high: "bg-red-500",
    medium: "bg-yellow-500",
    low: "bg-green-500",
  };

  const categoryColor = {
    general: "📋",
    work: "💼",
    personal: "👤",
    shopping: "🛒",
    health: "🏥",
    learning: "📚",
  };
  const isOverdue =
    todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed;
  const isDueSoon =
    todo.dueDate &&
    new Date(todo.dueDate) <= new Date(Date.now() + 24 * 60 * 60 * 1000) &&
    !todo.completed;
  return (
    <div
      className={`group transition-all duration-300 transform hover:scale-[1.02] ${
        isDeleting ? "opacity-0 translate-x-full" : "opacity-100 translate-x-0"
      }${isOverdue ? "ring-2 ring-red-400" : ""}`}
    >
      <div className="overflow-hidden transition-all duration-300 border shadow-lg bg-white/90 backdrop-blur-sm rounded-2xl border-white/20 hover:shadow-xl">
        <div className="flex items-start gap-4 p-5">
          <div className="relative mt-1">
            <input
              type="checkbox"
              className="checkbox-custom"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
          </div>
          <div className="flex-1 min-w-0">
            {/* Priority & Category */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  priorityColors[todo.priority]
                }`}
                title={`${todo.priority} priority`}
              ></div>
              <span className="text-sm text-gray-600">
                {categoryColor[todo.category]} {todo.category}
              </span>
              {isOverdue && (
                <span className="px-2 py-1 text-xs text-red-700 bg-red-100 rounded-full">
                  ⚠️ OverDue
                </span>
              )}
              {isDueSoon && !isOverdue && (
                <span className="px-2 py-1 text-xs text-orange-700 bg-orange-100 rounded-full">
                  ⏰ Due Soon
                </span>
              )}
            </div>

            {/* Todo Text */}
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleEdit()}
                className="w-full text-lg font-medium text-gray-800 bg-transparent border-b-2 border-blue-300 focus:outline-none focus:border-blue-500"
                autoFocus
              />
            ) : (
              <span
                className={`block text-lg font-medium transition-all duration-300 ${
                  todo.completed
                    ? "line-through text-gray-500 opacity-60"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
            )}
            {/* Due Date */}
            {todo.dueDate && (
              <div className="mt-1 text-sm text-gray-600">
                📅 Due: {new Date(todo.dueDate).toLocaleDateString()}
              </div>
            )}
            {/* Notes */}
            {todo.notes && (
              <div className="p-2 mt-2 text-sm text-gray-600 rounded-lg bg-gray-50">
                {" "}
                📝 {todo.notes}
              </div>
            )}

            {todo.completed && (
              <span className="block mt-2 text-sm font-medium text-green-600">
                ✓ Completed
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 transition-opacity duration-200 opacity-0 group-hover:opacity-100">
            {/* Edit Button */}
            <button
              className="p-2 text-blue-600 transition-all duration-200 bg-blue-100 rounded-xl hover:bg-blue-200"
              title="Edit Todo"
              onClick={handleEdit}
            >
              {isEditing ? "✓" : "✏️"}
            </button>
            {/* Toggle Button */}
            <button
              className={`p-2 rounded-xl transition-all duration-200 ${
                todo.completed
                  ? "bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                  : "bg-green-100 text-green-600 hover:bg-green-200"
              }`}
              title={todo.completed ? "Mark as incomplete" : "Mark as complete"}
              onClick={() => onToggle(todo.id)}
            >
              {todo.completed ? "↶" : "✓"}
            </button>
            {/* Delete Button */}
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 transition-all duration-200 transform bg-red-100 rounded-xl hover:bg-red-200 hover:scale-110"
              title="Delete todo"
            >
              🗑️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;
