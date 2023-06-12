import React, { useState, useContext } from 'react';
import { TodoItem, generateUniqueId } from '../App';
import { TodoContext } from '../context/todoContext';

interface TodoProps {
  todo: TodoItem;
  todoKey:string;
  onAddSubTodo?: (parentId: string, title: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo,todoKey ,onAddSubTodo }) => {
  const { todos, addTodo, deleteTodo } = useContext(TodoContext);
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

  const handleAddTodo = (parentId:string, title :string) => {
    // Call the addTodo function with the required parameters
    addTodo(parentId, title);
    console.log("kghfbsjhgbkjsfgbjshb")
  };

  const handleDeleteTodo = (id: string) => {
    // Call the deleteTodo function with the ID of the todo to delete
    deleteTodo(id);
  };

  return (
    <div className="" style={{ padding: '5px 0 5px 0' }} key={todoKey}>
      <div><img style={{width:"10px"}} src={"https://upload.wikimedia.org/wikipedia/commons/9/92/Location_dot_red.svg"} alt={"https://upload.wikimedia.org/wikipedia/commons/9/92/Location_dot_red.svg"}></img>
      <span>{todo.title}</span>
      <ul>
        {todo.todo.map((subTodo) => (
          <Todo todo={subTodo} todoKey={subTodo.id} onAddSubTodo={handleAddTodo} />
        ))}
      </ul></div>
      

      <div>
        <input type="text" value={subTodoText} onChange={handleSubTodoTextChange} />
        <button onClick={()=>handleAddTodo(todoKey,subTodoText)}>Add Sub Todo</button>
        <button onClick={()=>handleDeleteTodo(todoKey)}>delete Sub Todo</button>
      </div>
    </div>
  );
};

export default Todo;
