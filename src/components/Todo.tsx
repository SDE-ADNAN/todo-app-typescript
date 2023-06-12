import React, { useState, useContext} from "react";
import { TodoItem} from "../App";
import { TodoContext } from "../context/todoContext";
import AddImg from "./add.png";
import DeleteImg from "./remove.png";
import "./Todo.scss";

interface TodoProps {
  todo: TodoItem;
  todoKey: string;
  // onAddSubTodo?: (parentId: string, title: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, todoKey }) => {
  const { todos, addTodo, deleteTodo, setShowAddInput } = useContext(TodoContext);
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
    setShowAddInput(todoKey, false)
  };

  const handleDeleteTodo = (id: string) => {
    // Call the deleteTodo function with the ID of the todo to delete
    deleteTodo(id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    handleAddTodo(todoKey, subTodoText)
  }

  const RenderConditionalTodos = () => {
    if (todo.todo != null) {
      return (<ul className="adc">
        {todo.todo.map((subTodo) => (
          <Todo
            todo={subTodo}
            todoKey={subTodo.id}
          />
        ))}
      </ul>)
    } else
      if (todo.todo === null && todos.length > 0) {
        return (<ul className="xyz">
          {todos.map((subTodo) => (
            <Todo
              todo={subTodo}
              todoKey={subTodo.id}
            />
          ))}
        </ul>)
      }
    return (
      <div>nope</div>
    )
  }

  return (
    <div
      key={todoKey}
      className="todo_container"
    >
      <div className="head_container">
        <span>
          {todo.title}
          <div onClick={() => handleDeleteTodo(todoKey)}>
            <img src={DeleteImg} alt={"images"}></img>
          </div>
          <div className={`add_btn`} onClick={() => setShowAddInput(todoKey, true)}>
            <img src={AddImg} alt={"images"}></img>
          </div>
        </span>
        <div className={`btns `}>
          {todo.showInput && <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={subTodoText}
              onChange={handleSubTodoTextChange}
            />
          </form>}
        </div>
        <RenderConditionalTodos />
      </div>
    </div>
  );
};

export default Todo;
