import React from "react";
import TodoForm from "./components/Todo-Form/TodoForm";
import { useTodos } from "./hooks/useTodo";
import TodoList from "./components/Todo-List/TodoList";
import { Todo } from "./types/types";
import TodoControls from "./components/Todo-Controls/TodoControls";
const App: React.FC = () => {
  const {
    addTodo,
    allTodos,
    filter,
    setFilter,
    todos,
    deleteTodo,
    toggleTodo,
    updateTodo,
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    deleteCompleted,
    toggleAll,
  } = useTodos();

  // Filter
  const filters: { key: string; label: string; count: number; icon: string }[] =
    [
      {
        key: "all",
        label: "All",
        count: allTodos.length,
        icon: "📋",
      },
      {
        key: "active",
        label: "Active",
        count: allTodos.filter((t) => !t.completed).length,
        icon: "⏳",
      },
      {
        key: "completed",
        label: "Completed",
        count: allTodos.filter((t) => t.completed).length,
        icon: "✅",
      },
      {
        key: "overdue",
        label: "Overdue",
        count: allTodos.filter(
          (t: Todo) =>
            t.dueDate !== undefined &&
            new Date(t.dueDate) < new Date() &&
            !t.completed
        ).length,
        icon: "⚠️",
      },
    ];
  const completedCount = allTodos.filter((t) => t.completed).length;
  const totalTasks = allTodos.length;
  const progressPercentage =
    totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;
  return (
    <div className="min-h-screen gradient-bg">
      {/* Header */}
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* App Title */}
          <div className="mb-12 text-center">
            <h1 className="mb-6 text-6xl font-bold text-white drop-shadow-lg">
              Todo App
            </h1>
            <p className="mb-4 text-2xl font-light text-white/80">
              Organize your life with style
            </p>

            {/* Progress Bar */}
            {totalTasks > 0 && (
              <div className="max-w-md mx-auto">
                <div className="flex justify-between mb-2 text-sm text-white/80">
                  <span>Progress</span>
                  <span>{progressPercentage}% Complete</span>
                </div>
                <div className="w-full h-3 rounded-full bg-white/20">
                  <div
                    className="h-3 transition-all duration-500 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* Main Container */}
          <div className="p-8 shadow-2xl glass-effect rounded-3xl">
            <TodoForm onAdd={addTodo} />

            <TodoControls
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              sortBy={sortBy}
              setSortBy={setSortBy}
              onDeleteCompleted={deleteCompleted}
              onToggleAll={toggleAll}
              completedCount={completedCount}
            />

            {/* Stats & Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {filters.map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={`px-6 py-3 rounded-2xl font-medium duration-300 transition-all transform hover:scale-105 ${
                    filter === f.key
                      ? "bg-white text-purple-600 shadow-lg"
                      : "bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm"
                  }`}
                >
                  <span className="mr-2">{f.icon}</span>

                  {f.label}

                  <span className="px-2 py-1 ml-2 text-xs font-medium text-white rounded-full bg-white/10">
                    {f.count}
                  </span>
                </button>
              ))}
            </div>
            <TodoList
              todos={todos}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-white/60">
            Made with ❤️ using React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
