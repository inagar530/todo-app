import React from "react";

interface TodoControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  onDeleteCompleted: () => void;
  onToggleAll: () => void;
  completedCount: number;
}
const TodoControls: React.FC<TodoControlsProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  onDeleteCompleted,
  onToggleAll,
  completedCount,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search todos... 🔍"
          className="w-full px-6 py-3 text-white border placeholder-white/70 border-white/30 rounded-2xl bg-white/20 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/50"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute transform -translate-y-1/2 top-1/2 right-4 text-white/70 hover:text-white "
          >
            ✕
          </button>
        )}
      </div>

      {/* Controls Row */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* sort Options */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 text-white border bg-white/20 backdrop-blur-sm rounded-xl border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
          >
            {" "}
            <option value="created">📅 Date Created</option>
            <option value="priority">⚡ Priority</option>
            <option value="dueDate">📆 Due Date</option>
          </select>
        </div>

        {/* Bulk Actions */}
        <div className="flex gap-2">
          <button
            onClick={onToggleAll}
            className="px-4 py-2 text-white transition-all border bg-white/20 backdrop-blur-sm rounded-xl border-white/30 hover:bg-white/30"
            title="Toggle all todos"
          >
            🔄 Toggle All
          </button>

          {completedCount > 0 && (
            <button
              onClick={onDeleteCompleted}
              className="px-4 py-2 text-white transition-all border bg-red-500/20 backdrop-blur-sm rounded-xl border-red-300/30 hover:bg-red-500/30"
              title="Delete completed todos"
            >
              🗑️ Clear Completed ({completedCount})
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoControls;
