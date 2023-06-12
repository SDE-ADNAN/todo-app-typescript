import React, { useState, useContext } from 'react';
import { TodoItem, generateUniqueId } from '../App';
import { TodoContext } from '../context/todoContext';

interface TodoProps {
  todo: TodoItem;
  onAddSubTodo?: (parentId: string, title: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, onAddSubTodo }) => {
  const todoContextVal = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState('');

  const handleSubTodoTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTodoText(event.target.value);
  };

  const handleAddSubTodo = () => {
    if (onAddSubTodo) {
      onAddSubTodo(todo.id, subTodoText);
      setSubTodoText('');
    }
  };

  return (
    <div style={{ padding: '5px 0 5px 0' }}>
      <input type="checkbox" />
      <span>{todo.title}</span>
      <ul>
        {todo.todo.map((subTodo) => (
          <Todo todo={subTodo} key={subTodo.id} onAddSubTodo={onAddSubTodo} />
        ))}
      </ul>

      <div>
        <input type="text" value={subTodoText} onChange={handleSubTodoTextChange} />
        <button onClick={handleAddSubTodo}>Add Sub Todo</button>
      </div>

      <div>{JSON.stringify(todoContextVal)}</div>
    </div>
  );
};

export default Todo;
