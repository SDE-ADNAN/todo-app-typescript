import React, { useEffect, useRef } from "react"
import TodoList from "../../components/TodoList"
import { TodoItem } from "../../App";
import './Dashboard.scss'
import Loader from "../../components/UIComponents/Loader/Loader";
import logo from '../../medias/logo.png'
import { useNavigate } from "react-router-dom";
import TodosListContainer from "../../components/UIComponents/Todos/TodosListContainer/TodosListContainer";

interface DashboardPageProps {
  handleLogout: any;
  submitParentTodo: any;
  subTodoText: string;
  handleChange: any;
  handleParentaddition: any;
  todos: TodoItem[];
  setIsAuthenticated: any;
}


const sideBarData = [
  'Projects',
  'Todos',
  'Tags',
  'TodoTypes',
  'Profile',
]
const navLinks = [
  'Navlink1',
  'Navlink2',
  'Navlink3',
  'Navlink4',
  'Navlink5',
]

const Todosarr = [
  { title: "go to gym" },
  { title: "drop Talha to school" },
  { title: "do udemy price action" },
]

const DashboardPage: React.FC<DashboardPageProps> = ({ handleLogout, submitParentTodo, subTodoText, handleChange, handleParentaddition, todos, setIsAuthenticated }) => {

  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('Token');
    if (!token) {
      setIsAuthenticated(false)
      navigate('/login')
    } else {
      setIsAuthenticated(true)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="main_dashboard_container">
      <div className="dashboard_navbar">
        <div className="logo_image">
          <img src={logo} alt="logo"></img>
        </div>
        <div className="navbar_heading">Todos</div>
        <div className="navbar_void"></div>
        <div className='navbar_navlinks'>
          {navLinks.map((item) => {
            return (
              <div className='navbar_navlink_item'>{item}</div>
            )
          })}
        </div>
        <div className="navbar_right">
          <div>A</div>
        </div>
      </div>
      <div className='dashboard_sidebar_and_contents'>
        <div className="dashboard_sidebar">
          <div className="dashboard_sidebar_contents">
            {sideBarData.map((item, index) => {
              return (
                <div className="sidebar_item_container">
                  <div className="sidebar_item">{item}</div>
                  <div className='horizontal_divider'></div>
                </div>
              )
            })}
          </div>
          <div className="dashboard_sidebar_logoutbtn">
            <button onClick={handleLogout} className="logoutBtn" >Logout</button>
          </div>
        </div>
        <div className="dashboard_contents_main_container">
          <div className="contents_header">
            <div className="contents_header_h1"><h1 id="header_">Current Content header</h1>
            </div>
          </div>
          <div className="contents_container">
            <div className="parent_todo_head">
              <div className="main_input_container">
                <form onSubmit={submitParentTodo} style={{ display: "flex", alignItems: "center" }}>
                  <input
                    className="main_input"
                    ref={inputRef}
                    type="text"
                    value={subTodoText}
                    onChange={handleChange}
                    id="todo_input"
                    placeholder="Enter Your first level todo"
                  />

                  {/* <AddIcon onClick={handleParentaddition} /> */}
                  {/* <MinusIcon /> */}
                  {/* <ChevronIcon /> */}
                </form>
              </div>
            </div>
            <TodosListContainer todosArray={Todosarr} />
            <div className="todos_list_container">
              {todos ? <TodoList todo={todos} /> : <></>}
            </div>
          </div>
        </div>
      </div>

      <Loader isLoading={false} />
    </div >
  )
}

export default DashboardPage;