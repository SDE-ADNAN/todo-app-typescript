import React from "react"
import TodoList from "../../components/TodoList"

interface DashboardPageProps{
    handleLogout:any;
    submitParentTodo:any;
    subTodoText:string;
    handleChange:any;
    handleParentaddition:any;
    todos:any;
}

const DashboardPage:React.FC<DashboardPageProps> =({handleLogout,submitParentTodo,subTodoText,handleChange,handleParentaddition,todos})=>{
    return(
        <React.Fragment>
        <div className="parent_todo_head">
          <h1>Nested Todos</h1>
          <button onClick={handleLogout} className="logoutBtn" >Logout</button>
          <div className="main_input_container">
            <form onSubmit={submitParentTodo}>
              <input
                className="main_input"
                type="text"
                value={subTodoText}
                onChange={handleChange}
              />
            </form>
            <div className="add_parent" onClick={handleParentaddition}>
              Add +
            </div>
          </div>
        </div>
        <div className="todos_list_container">
          <TodoList todo={todos} />
        </div>
      </React.Fragment>
    )
}

export default DashboardPage;