import React from 'react';
import Todo from './Todo';

interface TodoListProps {
  todos: {
    id: number;
    text: string;
    subTodos: {
      id: number;
      text: string;
    }[];
  }[];
  onAddSubTodo: (parentId: number, text: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onAddSubTodo }) => {
  return (
    <div>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} onAddSubTodo={onAddSubTodo} />
      ))}
    </div>
  );
};

export default TodoList;
