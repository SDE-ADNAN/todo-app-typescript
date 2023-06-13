import React, { useState, useContext, ChangeEvent, useEffect} from "react";
import { TodoItem} from "../App";
import { TodoContext } from "../context/todoContext";
import "./Todo.scss";
import { AddImg, DeleteImg } from "../medias";

interface TodoProps {
  todo: TodoItem;
  todoKey: string;
}

const Todo: React.FC<TodoProps> = ({ todo, todoKey }) => {
  const { todos, addTodo, deleteTodo, setShowAddInput , setIsCompleted } = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");
  const [checkboxDisabled ,setCheckboxDisabled] = useState(false)

  const handleSubTodoTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTodoText(event.target.value);
  };


  const handleAddTodo = (parentId: string, title: string) => {
    // Call the addTodo function with the required parameters
    addTodo(parentId, title);
    setSubTodoText("");
    setShowAddInput(todoKey, false)
  };

  const handleDeleteTodo = (id: string) => {
    // Call the deleteTodo function with the ID of the todo to delete
    deleteTodo(id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(subTodoText.length === 0){
      alert("do a valid input todos cant be empty")
    }else
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

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>,todoId:string) => {
    const { checked } = event.target;
    setIsCompleted(todoId,checked)
  };

  useEffect(()=>{
    const allCompleted = todo.todo.map((todo)=>todo.isCompleted === true).some(value => value === false)
    if(todo.todo.length > 0 && !allCompleted){
      setCheckboxDisabled(false)
    }else if(todo.todo.length > 0 && allCompleted){
      setCheckboxDisabled(true)
    }else if(todo.todo.length === 0){
      setCheckboxDisabled(false)
    }
  },[todo])

  return (
    <div
      key={todoKey}
      className={`todo_container ${todo.isCompleted && "completed"}`}
    >
      <div className="subTodos_container">
      <div className="head_container">
        <div className="CTAS_container">
          {todo.title}
          <div className="CTAS"><div onClick={() => handleDeleteTodo(todoKey)}>
            <img src={DeleteImg} alt={"images"}></img>
          </div>
          <div className={`add_btn`} onClick={() => setShowAddInput(todoKey, true)}>
            <img src={AddImg} alt={"images"}></img>
          </div></div>
        </div>
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
      <div className="checkbox">{checkboxDisabled && "first complete subtodos"}<input type="checkbox" disabled={checkboxDisabled} checked={todo.isCompleted} onChange={(e)=>handleCheckboxChange(e,todo.id)}></input></div>
      </div>
      
    </div>
  );
};

export default Todo;
