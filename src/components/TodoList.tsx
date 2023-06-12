import React from 'react';
import Todo from './Todo';

interface TodoListProps {
  todos: {
    id: string;
    title: string;
    todos: {
      id: string;
      title: string;
    }[];
  }[];
  onAddSubTodo: (parentId: string, title: string) => void;
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
