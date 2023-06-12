import React, { useState } from 'react';

interface TodoProps {
  todo: {
    id: string;
    title: string;
    todos: {
      id: string;
      title: string;
    }[];
  };
  onAddSubTodo: (parentId: string, title: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onAddSubTodo }) => {
  const [subTodoText, setSubTodoText] = useState('');

  const handleSubTodoTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTodoText(event.target.value);
  };

  const handleAddSubTodo = () => {
    onAddSubTodo(todo.id, subTodoText);
    setSubTodoText('');
  };

  return (
    <div>
      <input type="checkbox" />
      <span>{todo.title}</span>
      <ul>
        {todo.todos.map((subTodo) => (
          <li key={subTodo.id}>{subTodo.title}</li>
        ))}
      </ul>
      <div>
        <input type="text" value={subTodoText} onChange={handleSubTodoTextChange} />
        <button onClick={handleAddSubTodo}>Add Sub Todo</button>
      </div>
    </div>
  );
};

export default Todo;
