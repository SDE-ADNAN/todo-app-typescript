import Todo from "./Todo";
import { TodoItem } from '../App';
import { useContext} from "react";
import { TodoContext } from "../context/todoContext";

interface TodoListProps {
  todo: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todo}) => {

  const {isLoading} = useContext(TodoContext)

  return (
    <>
    {!isLoading ? <div className="todo_List__" style={{
    display: "flex",
    flexDirection:"column"
    }} key={new Date().toISOString()}>
      {todo.map((todo) => (
        <Todo todoKey={todo._id.toString()} todo={todo} insideModal={false} isParent={true}/>
      ))}
    </div> : <h1> LOADING ......</h1>}
    </>
  );
};

export default TodoList;
