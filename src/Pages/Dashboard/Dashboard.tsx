import React, { useEffect, useRef } from "react"
import TodoList from "../../components/TodoList"
import Button from '@mui/material/Button';
import { TodoItem } from "../../App";
import GlassmorphicBackground from "../../components/UIComponents/Modal/DesignComponents/GlassmorphicBackground";

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
        <GlassmorphicBackground>
        <div className="parent_todo_head">
          <h1>Nested Todos</h1>
          <button onClick={handleLogout} className="logoutBtn" >Logout</button>
          <div className="main_input_container">
            <form onSubmit={submitParentTodo} style={{display: "flex",alignItems: "center"}}>
              <input
                className="main_input"
                ref={inputRef} 
                type="text"
                value={subTodoText}
                onChange={handleChange}
                placeholder="Enter Your first level todo"
              />
              <Button style={{backgroundColor: "#898121",borderRadius:"12px" , top:"0"}} variant="contained" className="add_parent" onClick={handleParentaddition}>
              Add +
            </Button>
            </form>
          </div>
        </div>
        <div className="todos_list_container">
          <TodoList todo={todos} />
        </div>
        </GlassmorphicBackground>
      </React.Fragment>
    )
}

export default DashboardPage;