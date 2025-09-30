import React, { useState } from "react";

interface FormData {
  text: string;
  priority: "high" | "medium" | "low";
  category:
    | "general"
    | "work"
    | "personal"
    | "shopping"
    | "health"
    | "learning";
  dueDate?: string | null;
  notes: string | number;
}

interface TodoFormProps {
  onAdd: (data: FormData) => void;
}

export default function TodoForm({ onAdd }: TodoFormProps) {
  const [formData, setFormData] = useState<FormData>({
    text: "",
    priority: "low",
    category: "general",
    dueDate: "",
    notes: "",
  });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAdvance, setShowAdvance] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.text.trim()) {
      setIsAnimating(true);
      onAdd(formData);
      setFormData({
        text: "",
        priority: "medium",
        category: "general",
        dueDate: "",
        notes: "",
      });
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const priorityColors: Record<FormData["priority"], string> = {
    low: "bg-green-100 text-green-700",
    high: "bg-red-100 text-red-700",
    medium: "bg-yellow-100 text-yellow-700",
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="p-4 border border-white bg-white/40 rounded-2xl backdrop-blur-sm">
          {/* Main Input */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={formData.text}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, text: e.target.value }))
              }
              placeholder="What need to be done?"
              className="flex-1 px-6 py-4 text-lg font-medium text-gray-800 placeholder-gray-500 bg-white border-0 shadow-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button
              type="button"
              className="px-4 py-4 text-white transition-all bg-white/30 rounded-xl hover:bg-white/40"
              onClick={() => setShowAdvance(!showAdvance)}
            >
              {" "}
              ⚙️
            </button>
            <button
              disabled={!formData.text.trim()}
              className={`px-8 py-4 font-semibold text-white transition-all duration-300 transform bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                isAnimating ? "animate-pulse" : ""
              }`}
            >
              {isAnimating ? "✨" : "+ Add"}
            </button>
          </div>

          {/* ShowAdvance Section */}
          {showAdvance && (
            <div className="grid grid-cols-1 gap-4 p-4 rounded-xl bg-white/10 md:grid-cols-3">
              {/* priority */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      priority: e.target.value as FormData["priority"],
                    }))
                  }
                  className={`w-full px-3 py-2 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 ${
                    priorityColors[formData.priority]
                  }`}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>

              {/* category */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      category: e.target.value as FormData["category"],
                    }))
                  }
                  className={`w-full px-3 py-2 bg-white rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800`}
                >
                  <option value="general">📋 General</option>
                  <option value="work">💼 Work</option>
                  <option value="personal">👤 Personal</option>
                  <option value="shopping">🛒 Shopping</option>
                  <option value="health">🏥 Health</option>
                  <option value="learning">📚 Learning</option>
                </select>
              </div>

              {/* due date */}
              <div>
                <label className="block mb-2 text-sm font-medium text-white/80">
                  Due Date
                </label>
                <input
                  type="Date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                  className={`w-full px-3 py-1.5 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800`}
                />
              </div>

              {/* create notes */}
              <div className="md:col-span-3">
                <label className="block mb-2 text-sm font-medium text-white/80">
                  Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  className="w-full px-3 py-2 text-gray-800 placeholder-gray-500 bg-white border-0 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-white/50"
                  placeholder="Additional notes..."
                  rows={2}
                />
              </div>
            </div>
          )}
        </div>
      </form>
    </>
  );
}
