import React, { useContext, useEffect, useState } from 'react';
import TodoList from './components/TodoList';
import { TodoContextProvider } from './context/todoContext';
import { TodoContext } from './context/todoContext';

export interface TodoItem {
  id: string;
  title: string;
  todo: TodoItem[];
  isCreated?:Boolean;
  showInput:Boolean;
  onAddSubTodo?: (parentId: string, title: string) => void;
}
export function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}
const App: React.FC = () => {
  const {todos,addTodo} = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");

  const handleChange=(
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTodoText(event.target.value);
  };

  const handleParentaddition=()=>{
    console.log(todos)
    addTodo(new Date().toISOString(),subTodoText)
    setSubTodoText("")
  }

  useEffect(()=>{
    console.log(todos)
      },[todos])


  return (
    <div>
      <h1>Nested Todos</h1>
      <input type="text" value={subTodoText} onChange={handleChange} />
      <div className="add_parent" onClick={handleParentaddition}>Add +</div>
      <TodoList todo={todos} />
    </div>
  );
};

export default App;
