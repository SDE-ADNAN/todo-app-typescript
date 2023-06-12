import React, { useContext, useState } from "react";
import TodoList from "./components/TodoList";
import { TodoContext } from "./context/todoContext";
import "./App.scss";

export interface TodoItem {
  id: string;
  title: string;
  todo: TodoItem[];
  isCreated?: Boolean;
  showInput: Boolean;
  // onAddSubTodo?: (parentId: string, title: string) => void;
}
export function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}
const App: React.FC = () => {
  const { todos, addTodo } = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTodoText(event.target.value);
  };

  const handleParentaddition = () => {
    console.log(todos);
    addTodo(new Date().toISOString(), subTodoText);
    setSubTodoText("");
  };

  const submitParentTodo=(e:any)=>{
    e.preventDefault();
    handleParentaddition()
  }

  return (
    <div className="main_container">
      <div className="parent_todo_head">
        <h1>Nested Todos</h1>
        <div className="main_input_container">
          <form onSubmit={submitParentTodo}>
          <input
            className="main_input"
            type="text"
            value={subTodoText}
            onChange={handleChange}
          /></form>
          <div className="add_parent" onClick={handleParentaddition}>
            Add +
          </div>
        </div>
      </div>
      <div className="todos_list_container">
        <TodoList todo={todos} />
      </div>
    </div>
  );
};

export default App;
