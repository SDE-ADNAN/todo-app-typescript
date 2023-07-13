import React, { useState, useContext, ChangeEvent, useEffect, useRef } from "react";
import { TodoItem } from "../App";
import { TodoContext, getUrl } from "../context/todoContext";
import "./Todo.scss";
import { AddImg, DeleteImg, edit, rightArrow } from "../medias";
import NoofSubtodos from "./UIComponents/NoofSubtodos";

interface TodoProps {
  todo: TodoItem;
  todoKey: string;
}

const Todo: React.FC<TodoProps> = ({ todo, todoKey }) => {
  const {
    todos,
    addSubTodo,
    deleteTodo,
    putTodo,
    setShowAddInput,
    setIsCompleted,
    // setShowSubTodos,
    setNewTitle,
    fetchData,
  } = useContext(TodoContext);
  const [subTodoText, setSubTodoText] = useState("");
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [showTodoTitleInput, setShowTodoTitleInput] = useState(false);
  const [checkboxDisabled, setCheckboxDisabled] = useState(false);
  const [anyOneTodoIncomplete, setAnyOneTodoIncomplete] = useState(false);
  const [showSubTodos, setShowSubTodos] = useState(todo.showSubtodos);
  // const [showSubTodosClicked, setShowSubTodosClicked] = useState(false);

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
    } else handleAddTodo(todoKey, subTodoText);
  };

  const handleTodoTitleSubmit = (e: any) => {
    e.preventDefault();
    if (todoTitle.length === 0) {
      alert("do a valid input todos cant be empty");
    } else {
      putTodo(todoTitle,todoKey);
    }
  };

  const RenderConditionalTodos = () => {
    if (todo.todo != null) {
      return (
        <ul className={`adc ${!todo.showSubtodos && "hide"}`}>
          {todo.todo.map((subTodo) => (
            <Todo todo={subTodo} todoKey={subTodo.id} />
          ))}
        </ul>
      );
    } else if (todo.todo === null && todos.length > 0) {
      return (
        <ul className={`xyz  ${!todo.showSubtodos && "hide"}`}>
          {todos.map((subTodo) => (
            <Todo todo={subTodo} todoKey={subTodo.id} />
          ))}
        </ul>
      );
    }
    return <div>nope</div>;
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
    const allCompleted = todo.todo
      .map((todo) => todo.isCompleted === true)
      .some((value) => value === false);
    const anyOneInComplete = todo.todo
      .map((todo) => todo.isCompleted)
      .some((value) => value === false);

      setAnyOneTodoIncomplete(anyOneInComplete)
    if (todo.todo.length > 0 && !allCompleted) {
      setCheckboxDisabled(false);
    } else if (todo.todo.length > 0 && allCompleted) {
      setCheckboxDisabled(true);
    } else if (todo.todo.length === 0) {
      setCheckboxDisabled(false);
    }
  }, [todo]);


  useEffect(() => {
    if (showTodoTitleInput && editTitleInputRef.current) {
      editTitleInputRef.current.focus();
    }
  }, [showTodoTitleInput]);

  const handleRightArrowClick = async () => {
    const formData = new FormData();
    formData.append('todoId', todo.id);
    if (showSubTodos) {
      formData.append('showSubtodos', 'false' );
    } else {
      formData.append('showSubtodos', 'true' );
    }
    try {
      const response = await fetch(getUrl('/admin/putTodo'), {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Request failed');
      } else {
        setShowSubTodos(!showSubTodos);
        fetchData()
      }
    } catch (error) {
      console.error('Error:', error);
    }
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
            {todo.todo.length > 0 && (
              <img
                onClick={handleRightArrowClick}
                className={`rightarrow  ${todo.showSubtodos && "rotate-90deg"}`}
                src={rightArrow}
                alt={"right-arrow"}
              ></img>
            )}
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
              {todo.todo.length > 0 && (
                <NoofSubtodos subTodoNumber={todo.todo.length} />
              )}
              <div
                title={"Delete this todo "}
                onClick={() => handleDeleteTodo(todoKey)}
                className={`${todo.todo.length > 0 && "opacity0&disable"}`}
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

          <RenderConditionalTodos />
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            disabled={checkboxDisabled}
            checked={todo.isCompleted && !anyOneTodoIncomplete}
            title={`${
              checkboxDisabled ? "first complete subtodos" : "Complete"
            } `}
            onChange={(e) => handleCheckboxChange(e, todo.id)}
          ></input>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Todo);
