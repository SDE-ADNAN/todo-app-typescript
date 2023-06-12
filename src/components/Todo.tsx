import React, { useState, useContext, useEffect } from "react";
import { TodoItem, generateUniqueId } from "../App";
import { TodoContext } from "../context/todoContext";
import AddImg from "./add.png";
import DeleteImg from "./remove.png";
import "./Todo.scss";

interface TodoProps {
  todo: TodoItem;
  todoKey: string;
  onAddSubTodo?: (parentId: string, title: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, todoKey, onAddSubTodo }) => {
  const { todos, addTodo, deleteTodo,setShowAddInput } = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");

  const handleSubTodoTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTodoText(event.target.value);
  };


  const handleAddTodo = (parentId: string, title: string) => {
    // Call the addTodo function with the required parameters
    addTodo(parentId, title);
    setSubTodoText("");
    // setShowAddInput2(false)
    setShowAddInput(todoKey,false)
  };

  const handleDeleteTodo = (id: string) => {
    // Call the deleteTodo function with the ID of the todo to delete
    deleteTodo(id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddTodo(todoKey, subTodoText)
  }

  useEffect(()=>{
console.log(todos)
  },[todos])
  return (
    <div
      className="todo_container"
      style={{ padding: "5px 0 5px 0" }}
      key={todoKey}
    >

      <div className="head_container">


        <span>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/9/92/Location_dot_red.svg"
            }
            alt={
              "https://upload.wikimedia.org/wikipedia/commons/9/92/Location_dot_red.svg"
            }
          ></img>
          {todo.title}{" "}
          {"      "+todo.id}
          
          <div onClick={() => handleDeleteTodo(todoKey)}>
            <img src={DeleteImg} alt={"images"}></img>
          </div>
          <button onClick={() => setShowAddInput(todoKey,true)}>
            <img src={AddImg} alt={"images"}></img>
          </button>
        </span>
        <div className={`btns ${todo.isCreated && "hide"}`}>
            {todo.showInput  && <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={subTodoText}
                onChange={handleSubTodoTextChange}
              />
            </form>}
          </div>
        <ul>
          {todo.todo.map((subTodo) => (
            <Todo
              todo={subTodo}
              todoKey={subTodo.id}
              onAddSubTodo={handleAddTodo}
            />
          ))}
        </ul>

      </div>


    </div>
  );
};

export default Todo;
