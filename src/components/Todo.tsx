import React, { useState } from 'react';
import { TodoItem, generateUniqueId } from '../App';

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
  const handleAddSubTodo = (parentId: string, title: string) => {
    // Find the parent todo based on parentId
    const parentTodo = todo.todo.find(todo => todo.id === parentId);

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
    setSubTodoText('');
  };

  return (
    <div style={{padding:"5px 0 5px 0"}}>
      <input type="checkbox" />
      <span>{todo.title}</span>
      <ul>
        {todo.todo.map((todo) => (
        <Todo todo={todo} key={todo.id}  onAddSubTodo={handleAddSubTodo}/>
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
