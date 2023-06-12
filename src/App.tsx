import React, { useState } from 'react';
import TodoList from './components/TodoList';
import data from './data/todoData';

export interface TodoItem {
  id: string;
  title: string;
  todos: TodoItem[];
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>(data);

  const handleAddSubTodo = (parentId: string, title: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === parentId) {
        const newTodo: TodoItem = {
          id: new Date().toISOString(),
          title,
          todos: [],
        };
        return {
          ...todo,
          todos: [...todo.todos, newTodo],
        };
      }
      return todo;
    });

    setTodos(newTodos);
  };

  return (
    <div>
      <h1>Nested Todos</h1>
      <TodoList todos={todos} onAddSubTodo={handleAddSubTodo} />
    </div>
  );
};

export default App;
