import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "./context/todoContext";
import "./App.scss";
import { Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Pages/Admin/LoginPage";
import userCredentialsArray from "./data/users";
import DashboardPage from "./Pages/Dashboard/Dashboard";

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

  return (
    <div className="main_container">
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          {isAuthenticated && (<React.Fragment>
            <Route path="/dashboard" element={<DashboardPage handleLogout={handleLogout} submitParentTodo={submitParentTodo} subTodoText={subTodoText} handleChange={handleChange} handleParentaddition={handleParentaddition}  todos={todos} />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} /></React.Fragment>
          )}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
