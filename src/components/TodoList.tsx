import React from 'react';
import Todo from "./Todo";
import { TodoItem } from '../App';

interface TodoListProps {
  todo: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todo}) => {
  return (
    <div>
      {todo.map((todo) => (
        <Todo todoKey={todo.id} todo={todo}/>
      ))}
    </div>
  );
};

export default TodoList;
