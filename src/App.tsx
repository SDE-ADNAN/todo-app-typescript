import React, { useEffect, useState } from "react";
import "./App.scss";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./ReduxStore/store";

import bgDark from './medias/bgfinaldark.jpg'
import bgLight from './medias/bgfinallight.jpg'
import LoginPage from "./Pages/Admin/LoginPage";
import RegisterPage from "./Pages/Admin/RegisterPage";
import Loader from "./components/UIComponents/Loader/Loader";
import { useDispatch } from "react-redux";
import { /*UserLogout,*/ setAllUserData, setToken } from "./ReduxStore/UserSlice";
// import useUserProfileCall from "./hooks/useUserProfileAPICall";
// import useGETAllTodos from "./hooks/useGETAllTodos";
import DashboardWrapper from "./components/WRAPPERS/DashboardWrapper/DashboardWrapper";
import TodosListContainer from "./components/UIComponents/Todos/TodosListContainer/TodosListContainer";
import {/* UILogout,*/ setAllTodos, setDarkMode, setLoading } from "./ReduxStore/UISlice";
import { getUrl, isDarkModeFromLocalStorage } from "./CONFIG";
import TodoDetails from "./components/UIComponents/TodoDetails/TodoDetails";
import NotFound from "./Pages/NotFound/NotFound";

export interface TodoItem {
  _id: string;
  title: string;
  todo: TodoItem[];
  isCreated?: Boolean;
  showInput: Boolean;
  isCompleted: boolean;
  showSubtodos: Boolean;
  // onAddSubTodo?: (parentId: string, title: string) => void;
}
export function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}
const App: React.FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [tokenIsPresent, setTokenIsPresent] = useState<boolean | null>(null)

  const isLoading = useSelector((state: RootState) => state.UI.loading);
  // Inside your component or any other place where you want to trigger the API call
  const dispatch = useDispatch();

  const allTodos = useSelector((state: RootState) => state.UI.allTodos)
  // const userAllData = useSelector((state: RootState) => state.User.allUserData)
  const token = useSelector((state: RootState) => state.User.token)
  const theme = useSelector((state: RootState) => state.UI.theme)



  const fetchAllUserData = (token: string) => {
    if (token) {
      dispatch(setLoading(true))
      try {
        if (token !== null) {
          fetch(getUrl('/auth/profile'), {
            method: 'GET',
            headers: {
              'Authorization': token
            }
          }).then(
            (res) => {
              if (res.ok) {
                return res.json()
              }
            }
          ).then((jsonData) => {
            // if(jsonData && jsonData.user){
            console.log(jsonData)
            dispatch(setAllUserData(jsonData.user))
            dispatch(setAllTodos(jsonData.user.todos))
            // }
          })
        }
      } catch (err) {
        console.error('Error:', err);
      }
      dispatch(setLoading(false))
    } else {
      throw new Error("Token is not present")
    }
  }
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("Token")
    window.location.href = '/login'
  };

  useEffect(() => {
    const localStorage_jwtToken = localStorage.getItem("Token")
    if (!token && localStorage_jwtToken) {
      dispatch(setToken(localStorage_jwtToken))
      setIsAuthenticated(true)
    } else if (token && localStorage_jwtToken) {
      setIsAuthenticated(true)
    } else {
      setIsAuthenticated(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    if (token) {
      dispatch(setLoading(true))
      fetchAllUserData(token)
      dispatch(setLoading(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    // dispatch(setLoading(true))
    const darkMode = isDarkModeFromLocalStorage()
    if (darkMode) {
      dispatch(setDarkMode(true))
    } else {
      dispatch(setDarkMode(false))
    }
    // dispatch(setLoading(false))
  }, [theme.dark])

  return (
    <div className={`main_container ${theme.dark ? 'dark_mode' : 'light_mode'}`}>
      {theme.dark ? <div className="image_container"><img src={bgDark} alt='bg'></img></div> : <div className="image_container"><img src={bgLight} alt='bg'></img></div>}

      <Routes>
          {!isAuthenticated && (
            <>
            <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} fetchAllUserData={fetchAllUserData} />} />
              <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </>
          )}

        {isAuthenticated ? (<>
          {/* <Route path="/" element={<Navigate to="/dashboard/todos" />} /> */}
          <Route path="/" element={ // Added a wildcard (*) to match any child routes under "/home"
            <DashboardWrapper fetchAllUserData={fetchAllUserData} handleLogout={handleLogout} heading="Dashboard" />
          }>
            {/* Nested routes for the dashboard */}
            {/* <Route index element={<TodosListContainer fetchAllUserData={fetchAllUserData} todosArray={allTodos} />} /> */}
            <Route index path='todos' element={<TodosListContainer fetchAllUserData={fetchAllUserData} todosArray={allTodos} />} />
            <Route path='todos/:parentTodo_id' element={<TodoDetails />} />
            <Route path='todos/:parentTodo_id/subTodo/:childTodo_id' element={<TodoDetails />} />
            <Route path='todos' element={<Navigate to='/todos' />} />

              {/* Fallback route for any other unmatched paths */}
            <Route path="*" element={<NotFound isAuthenticated={isAuthenticated} />} />
          </Route></>
        ) : <></>}
          {/* Fallback route for other unmatched paths */}
        <Route path="*" element={<NotFound isAuthenticated={isAuthenticated} />} />
      </Routes>

      <Loader isLoading={isLoading} />
    </div>
  );
};

export default App;
