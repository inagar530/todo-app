import React from 'react'
import {Todo} from '../../types/types'
import TodoItem from '../Todo-item/TodoItem'

interface TodoListProps {
    todos: Todo[],
    onToggle: (id: number) => void,
    onDelete: (id: number) => void,
    onUpdate: (id: number, updates: Partial<Todo>) => void
  }
  

function TodoList({todos,onToggle,onDelete,onUpdate}:TodoListProps) {
  if (todos.length === 0) {
    return(
      <>
      <div className='py-16 text-center'>
        <div className='mb-4 text-6xl'>👀</div>
          <h3 className='mb-2 text-2xl font-semibold text-white'>
            All Caught Up!
          </h3>
          <p className='text-lg text-white/70'>
            No todo here.Time to add some goals...!
          </p>
        
      </div>
      </>
    )
  }
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-xl font-semibold text-white'>Your Tasks ({todos.length})</h2>
        <div className='text-sm text-white/60'>
          {todos.filter(t => t.completed).length} Completed
        </div>
      </div>
      
      {todos.map((todo , index) => (
        <div key={todo.id} style={{animationDelay:`${index*50}ms`}} className='animate-fade-in'>
          <TodoItem 
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
          />
        </div>
      ))}
    </div>
  )
}

export default TodoList
