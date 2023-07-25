import React, { useState, useContext, ChangeEvent, useEffect, useRef } from "react";
import { TodoItem } from "../App";
import { TodoContext} from "../context/todoContext";
import "./Todo.scss";
import { AddImg, DeleteImg, edit, rightArrow } from "../medias";
import NoofSubtodos from "./UIComponents/NoofSubtodos";
import Modal from "./UIComponents/Modal";

interface TodoProps {
  todo: TodoItem;
  todoKey: string;
  insideModal:Boolean;
}

const Todo: React.FC<TodoProps> = ({ todo, todoKey ,insideModal}) => {
  const {
    addSubTodo,
    deleteTodo,
    putTodo,
    postSubTodo,
    setShowAddInput,
    setIsCompleted,
  } = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [showTodoTitleInput, setShowTodoTitleInput] = useState(false);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);
  const [anyOneTodoIncomplete, setAnyOneTodoIncomplete] = useState(false);
  const [showSubtodos, setShowSubTodos] = useState(todo.showSubtodos);
  // const [showSubtodosClicked, setShowSubTodosClicked] = useState(false);

  const editTitleInputRef = useRef<HTMLInputElement>(null);


  const handleSubTodoTextChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSubTodoText(event.target.value);
  };

  const handleAddTodo = (parentId: string, title: string) => {
    addSubTodo(parentId,title);
    setSubTodoText("");
    setShowAddInput(todoKey, false);
  };

  const handleDeleteTodo = (id: string) => {
    deleteTodo(id);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (subTodoText.length === 0) {
      alert("do a valid input todos cant be empty");
    } else postSubTodo(todoKey, subTodoText);
  };

  const handleTodoTitleSubmit = (e: any) => {
    e.preventDefault();
    if (todoTitle.length === 0) {
      alert("do a valid input todos cant be empty");
    } else {
      putTodo({title:todoTitle},todoKey);
    }
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    todoId: string
  ) => {
    const { checked } = event.target;
    setIsCompleted(todoId, checked);
  };
  const handleTodoTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newTitle = event.target.value;
    setTodoTitle(newTitle);
  };

  useEffect(() => {
    const allCompleted = todo && todo.todo && todo.todo
      .map((todo) => todo && todo.isCompleted && todo.isCompleted === true)
      .some((value) => value === false);
    const anyOneInComplete = todo && todo.todo &&  todo.todo
      .map((todo) => todo && todo.todo && todo.isCompleted)
      .some((value) => value === false);

      setAnyOneTodoIncomplete(anyOneInComplete)
    if (todo && todo.todo && todo.todo.length && todo.todo.length > 0 && !allCompleted) {
      setCheckboxDisabled(false);
    } else if (todo && todo.todo && todo.todo.length && todo.todo.length > 0 && allCompleted) {
      setCheckboxDisabled(true);
    } else if (todo && todo.todo && todo.todo.length && todo.todo.length === 0) {
      setCheckboxDisabled(false);
    }
  }, [todo]);


  useEffect(() => {
    if (showTodoTitleInput && editTitleInputRef.current) {
      editTitleInputRef.current.focus();
    }
  }, [showTodoTitleInput]);

  const handleRightArrowClick = () => {
    setShowSubTodos(!showSubtodos)
  };
  return (
    <div
      key={todoKey}
      id={todoKey}
      className={`todo_container ${todo.isCompleted && !anyOneTodoIncomplete && "completed"}  `}
    >
      <div className="subTodos_container">
        <div className="head_container">
          <div className="CTAS_container">
            {todo && todo.todo && todo.todo.length && todo.todo.length > 0 && !insideModal ? 
              <img
                onClick={handleRightArrowClick}
                className={`rightarrow  ${showSubtodos && "rotate-90deg"}`}
                src={rightArrow}
                alt={"right-arrow"}
              ></img>:<></>
            }
            {!showTodoTitleInput ? (
              <div
                className="todo_title truncate-text"
                onDoubleClick={() => {
                  setShowTodoTitleInput(!showTodoTitleInput);
                  if (!showTodoTitleInput) {
                    setTodoTitle(todo.title);
                  }
                }}
                onDoubleClickCapture={() => {
                  setShowTodoTitleInput(!showTodoTitleInput);
                  if (!showTodoTitleInput) {
                    setTodoTitle(todo.title);
                  }
                }}
              >
                {todo.title}
              </div>
            ) : (
              <div className="todo_title truncate-text">
                <form onSubmit={handleTodoTitleSubmit}>
                  <input
                  ref={editTitleInputRef}
                    type="textarea"
                    value={todoTitle}
                    onChange={handleTodoTitleChange}
                  ></input>
                </form>
              </div>
            )}
            <div className="CTAS">
              {todo && todo.todo && todo.todo.length &&todo.todo.length > 0 ? 
                <NoofSubtodos subTodoNumber={todo.todo.length} />
                :<></>
              }
              <div
                title={"Delete this todo "}
                onClick={() => handleDeleteTodo(todoKey)}
                className={`${todo && todo.todo && todo.todo.length &&todo.todo.length > 0 && "opacity0&disable"}`}
              >
                <img src={DeleteImg} alt={"images"}></img>
              </div>
              <div
                className={`add_btn`}
                title={"Add a subtodo"}
                onClick={() => setShowAddInput(todoKey, !todo.showInput)}
              >
                <img src={AddImg} alt={"images"}></img>
              </div>
              <div
                className={`edit_btn`}
                title={"Edit"}
                onClick={() => {
                  setShowTodoTitleInput(!showTodoTitleInput);
                  const todoTitleChangeInput = document.getElementById("todoTitleChange")
                  if(todoTitleChangeInput){
                    todoTitleChangeInput.focus();
                  }
                  if (!showTodoTitleInput) {
                    setTodoTitle(todo.title);
                  }
                }}
              >
                <img src={edit} alt={"edit"}></img>
              </div>
            </div>
          </div>
          <div className={`btns `}>
            {todo.showInput && (
              <form onSubmit={handleSubmit}>
                <input
                  id="subTodoText"
                  type="text"
                  value={subTodoText}
                  onChange={handleSubTodoTextChange}
                />
                <div
                  className="cancelbtn"
                  onClick={() => {
                    setSubTodoText("");
                    setShowAddInput(todoKey, false);
                  }}
                >
                  Cancel
                </div>
              </form>
            )}
          </div>
                {todo && todo.todo && showSubtodos ? 
                <Modal isOpen={showSubtodos} onClose={handleRightArrowClick}>
                <ul className={`adc ${showSubtodos? "":"hide"}`}>
                  {todo.todo.map((subTodo) => {
                    return(<Todo todo={subTodo} todoKey={todo._id} insideModal={true}/>)
                })}
                </ul>
                </Modal>
                :<></>
                }
        </div>
        
        <div className="checkbox">
          <input
            type="checkbox"
            disabled={checkboxDisabled}
            checked={todo.isCompleted && !anyOneTodoIncomplete}
            title={`${
              checkboxDisabled ? "first complete subtodos" : "Complete"
            } `}
            onChange={(e) => handleCheckboxChange(e, todo._id.toString())}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Todo);
