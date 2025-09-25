import React from "react";
import TodoForm from "./components/Todo-Form/Todo-Form";

const App: React.FC = () => {
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
          </div>

          {/* Progress Bar */}

          {/* Main Container */}
          <div className="p-8 shadow-2xl glass-effect rounded-3xl">
            <TodoForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
