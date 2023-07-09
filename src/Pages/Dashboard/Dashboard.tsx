import React, { useEffect, useRef } from "react"
import TodoList from "../../components/TodoList"
import { TodoItem } from "../../App";

interface DashboardPageProps{
    handleLogout:any;
    submitParentTodo:any;
    subTodoText:string;
    handleChange:any;
    handleParentaddition:any;
    todos:TodoItem[];
}

const DashboardPage:React.FC<DashboardPageProps> =({handleLogout,submitParentTodo,subTodoText,handleChange,handleParentaddition,todos})=>{

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
    return(
        <React.Fragment>
        <div className="parent_todo_head">
          <h1>Nested Todos</h1>
          <button onClick={handleLogout} className="logoutBtn" >Logout</button>
          <div className="main_input_container">
            <form onSubmit={submitParentTodo}>
              <input
                className="main_input"
                ref={inputRef} 
                type="text"
                value={subTodoText}
                onChange={handleChange}
                placeholder="Enter Your first level todo"
              />
            </form>
            <button className="add_parent" onClick={handleParentaddition}>
              Add +
            </button>
          </div>
        </div>
        <div className="todos_list_container">
          <TodoList todo={todos} />
        </div>
      </React.Fragment>
    )
}

export default DashboardPage;