export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  category: "general" | "work" | "personal" | "shopping" | "health" | "learning";
  dueDate?: string | null;
  createdAt: string;
  notes?: string;
}

export interface NewTodo {
    text: string
    priority: 'high' | 'medium' | 'low'
    category: string
    dueDate: string | null
    notes: string
  }
  
  // export interface Todo extends NewTodo {
  //   id: number
  //   completed: boolean
  //   createdAt: string
  // }