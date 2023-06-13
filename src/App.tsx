import React, { useContext, useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import { TodoContext } from "./context/todoContext";
import "./App.scss";
import { Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Pages/Admin/LoginPage";
import PrivateRoute from "./components/RouteComponents/PrivateRoute";
import userCredentialsArray from "./data/users";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTodoText(event.target.value);
  };

  const handleParentaddition = () => {
    console.log(todos);
    addTodo(new Date().toISOString(), subTodoText);
    setSubTodoText("");
  };

  const submitParentTodo = (e: any) => {
    e.preventDefault();
    handleParentaddition();
  };

  // Function to handle successful authentication
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("jwtToken")
  };
  useEffect(()=>{
    const localStorage_jwtToken = localStorage.getItem("jwtToken")
    const isUserVerifiedPreviously = userCredentialsArray.find((user) => user.jwtToken === localStorage_jwtToken);
    if(isUserVerifiedPreviously){
      setIsAuthenticated(true)
    }
  },[isAuthenticated])

  const Dashboard = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <div className="main_container">
      <Router>
        <Routes>
        
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {isAuthenticated && (<>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} /></>
          )}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
          {/* <PrivateRoute
            path="/dashboard"
            element={<Dashboard />}
            isAuthenticated={isAuthenticated}
            redirectPath="/login"
          /> */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
