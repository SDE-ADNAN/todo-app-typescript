import React, { useState } from 'react';
import TodoList from './components/TodoList';

interface TodoItem {
  id: number;
  text: string;
  subTodos: TodoItem[];
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([
    {
      id: 1,
      text: 'Todo 1',
      subTodos: [],
    },
    {
      id: 2,
      text: 'Todo 2',
      subTodos: [],
    },
  ]);

  const handleAddSubTodo = (parentId: number, text: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === parentId) {
        const newSubTodo: TodoItem = {
          id: Math.random(),
          text,
          subTodos: [],
        };
        return {
          ...todo,
          subTodos: [...todo.subTodos, newSubTodo],
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
