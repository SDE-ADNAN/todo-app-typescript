import React, { useState } from 'react';
import { TodoItem } from '../App';

interface TodoProps {
  todo: {
    id: string;
    title: string;
    todo: TodoItem[];
  };
  onAddSubTodo?: (parentId: string, title: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onAddSubTodo }) => {
  const [subTodoText, setSubTodoText] = useState('');

  const handleSubTodoTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTodoText(event.target.value);
  };

  const handleAddSubTodo = () => {
    if(onAddSubTodo){
    onAddSubTodo(todo.id, subTodoText);
  }
    setSubTodoText('');
  };

  return (
    <div>
      <input type="checkbox" />
      <span>{todo.title}</span>
      <ul>
        {todo.todo.map((todo) => (
          <li >{JSON.stringify(todo)}</li>
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
