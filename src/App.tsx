import React, { useContext, useEffect, useState } from "react";
import { TodoContext } from "./context/todoContext";
import "./App.scss";
import { Navigate, Route, BrowserRouter as Router, Routes, useNavigate } from "react-router-dom";

// import bgDark from './medias/bgfinaldark.jpg'
import bgLight from './medias/bgfinallight.jpg'
import LoginPage from "./Pages/Admin/LoginPage";
import DashboardPage from "./Pages/Dashboard/Dashboard";
import RegisterPage from "./Pages/Admin/RegisterPage";
import Loader from "./components/UIComponents/Loader/Loader";

export interface TodoItem {
  _id: string;
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

  const { todos, addTodo } = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isloading, setIsLoading] = useState(true);
  const [tokenIsPresent, setTokenIsPresent] = useState<boolean | null>(null)


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

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("Token")
    setIsAuthenticated(false);
    window.location.href = '/login'
  };
  useEffect(()=>{
    // fetchData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    const localStorage_jwtToken = localStorage.getItem("Token")

    if (localStorage_jwtToken) {
      setIsAuthenticated(true)
    }
  }, [tokenIsPresent])

  // loading for contents of site to load  ( medias )
  useEffect(() => {
    setTokenIsPresent(localStorage.getItem("Token") !== null || localStorage.getItem("Token") !== '' ? false : true)
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  return (
    <div className="main_container">
      {/* <img src={bgDark} alt='bg'></img> */}
      <div className="image_container"><img src={bgLight} alt='bg'></img></div>
      <Router>
        <Routes>
          {!isAuthenticated && <>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </>}
          {isAuthenticated && (<React.Fragment>
            <Route path="/dashboard" element={<DashboardPage setIsAuthenticated={setIsAuthenticated} handleLogout={handleLogout} submitParentTodo={submitParentTodo} subTodoText={subTodoText} handleChange={handleChange} handleParentaddition={handleParentaddition} todos={todos} />} />
            <Route path="/" element={<Navigate to="/dashboard" />} /></React.Fragment>
          )}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      <Loader isLoading={isloading} />
    </div>
  );
};

export default App;
