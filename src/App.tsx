import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "./context/todoContext";
import "./App.scss";
import { Navigate, Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Pages/Admin/LoginPage";
import userCredentialsArray from "./data/users";
import DashboardPage from "./Pages/Dashboard/Dashboard";
import useHTTP from "./hooks/useHTTP";

export interface TodoItem {
  id: string;
  title: string;
  todo: TodoItem[];
  isCreated?: Boolean;
  showInput: Boolean;
  isCompleted:boolean;
  showSubtodos:Boolean;
  // onAddSubTodo?: (parentId: string, title: string) => void;
}
export function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}
const App: React.FC = () => {

  const { todos, addTodo , fetchData} = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const formData = new FormData()
//   formData.append('title','some new task useHTTP')
//   // formData.append('todoId','1687164570139_20314')
//   const [ data , error] = useHTTP(false,"post",formData,{
//   'Content-Type': 'application/json',
// },"/admin/postTodo")
//   console.log(data)
//   console.log(error)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTodoText(event.target.value);
  };

  const handleParentaddition = () => {
    if(subTodoText.length === 0){
      alert("do a valid input todos cant be empty")
    }else
    addTodo(subTodoText);
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
    fetchData()

  },[])
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
