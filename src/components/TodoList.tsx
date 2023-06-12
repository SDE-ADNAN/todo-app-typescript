import React from 'react';
import Todo from './Todo';
import { TodoItem } from '../App';

interface TodoListProps {
  // id: string;
  // title: string;
  todo: TodoItem[];
  onAddSubTodo?: (parentId: string, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todo, onAddSubTodo }) => {
  return (
    <div>
      {todo.map((todo) => (
        <Todo key={todo.id} todo={todo} onAddSubTodo={onAddSubTodo} />
      ))}
    </div>
  );
};

export default TodoList;
