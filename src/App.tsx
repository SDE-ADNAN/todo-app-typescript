import React, { useState } from 'react';
import TodoList from './components/TodoList';
import data from './data/todoData';

export interface TodoItem {
  id: string;
  title: string;
  todo: TodoItem[];
  onAddSubTodo?: (parentId: string, title: string) => void;
}
export function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}
const App: React.FC = () => {
  const [todo, setTodos] = useState<TodoItem[]>(data);

  const handleAddSubTodo = (parentId: string, title: string) => {
    // Find the parent todo based on parentId
    const parentTodo = todo.find(todo => todo.id === parentId);

    if (parentTodo) {
      // Create the new sub-todo
      const newSubTodo: TodoItem = {
        id: generateUniqueId(), // You would need to implement a unique ID generation logic
        title: title,
        todo: []
      };

      // Add the new sub-todo to the parent todo
      parentTodo.todo.push(newSubTodo);
    }
  };

  return (
    <div>
      <h1>Nested Todos</h1>
      <TodoList todo={todo} onAddSubTodo={handleAddSubTodo} />
    </div>
  );
};

export default App;
