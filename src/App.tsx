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
import {/* UILogout,*/ setAllTodos, setLoading } from "./ReduxStore/UISlice";
import { getUrl } from "./CONFIG";

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


  // const [userAllErr] = useUserProfileCall(getUrl("/auth/profile"), {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': token
  //   }
  // })
  // const [useAllTodosErr] = useGETAllTodos(getUrl("/admin/getAllTodos"), {
  //   method: 'GET',
  //   headers: {
  //     'Authorization': token
  //   }
  // })

  const fetchAllUserData = (token: string) => {
    if (token) {
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
    } else {
      throw new Error("Token is not present")
    }
  }
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("Token")
    setIsAuthenticated(false);
    window.location.href = '/login'
  };

  useEffect(() => {
    const localStorage_jwtToken = localStorage.getItem("Token")

    if (!token && localStorage_jwtToken) {
      dispatch(setToken(localStorage_jwtToken))
      setIsAuthenticated(true)
    } else if (token) {
      setIsAuthenticated(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenIsPresent])

  useEffect(() => {
    if (token) {
      dispatch(setLoading(true))
      fetchAllUserData(token)
      dispatch(setLoading(false))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])



  // loading for contents of site to load  ( medias )
  useEffect(() => {
    setTokenIsPresent(localStorage.getItem("Token") !== null || localStorage.getItem("Token") !== '' ? false : true)
  }, []);




  return (
    <div className={`main_container ${theme.dark ? 'dark_mode' : 'light_mode'}`}>
      {theme.dark ? <div className="image_container"><img src={bgDark} alt='bg'></img></div> : <div className="image_container"><img src={bgLight} alt='bg'></img></div>}

      <Router>
        <Routes>
          {/* Fallback route for the root */}
          <Route path="/" element={<Navigate to="/" replace />} />

          {!isAuthenticated && (
            <>
              <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/register" element={<RegisterPage setIsAuthenticated={setIsAuthenticated} />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
            </>
          )}

          {isAuthenticated && (
            <Route path="/*" element={ // Added a wildcard (*) to match any child routes under "/home"
              <DashboardWrapper fetchAllUserData={fetchAllUserData} handleLogout={handleLogout} heading="Dashboard / Todos">
                <Routes>
                  <Route path="/todos" element={<TodosListContainer todosArray={allTodos} />} />
                  <Route path="/*" element={<Navigate to="/todos" replace />} />
                  {/*will Add fallback route for any other unmatched paths */}
                </Routes>
              </DashboardWrapper>
            } />
          )}

          {/* Fallback route for other unmatched paths */}
          <Route path="/*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </Router>

      <Loader isLoading={isLoading} />
    </div>
  );
};

export default App;
