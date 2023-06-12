import React, { useState } from 'react';

interface TodoProps {
  todo: {
    id: number;
    text: string;
    subTodos: {
      id: number;
      text: string;
    }[];
  };
  onAddSubTodo: (parentId: number, text: string) => void;
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
      <span>{todo.text}</span>
      <ul>
        {todo.subTodos.map((subTodo) => (
          <li key={subTodo.id}>{subTodo.text}</li>
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
