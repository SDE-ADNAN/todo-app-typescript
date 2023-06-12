import React, { createContext, useState } from "react";
import { TodoItem } from "../App";
import data from "../data/todoData";

const initialTodoData: TodoItem[] = data;

type TodoContextProviderProps = {
  children: React.ReactNode;
  todo?: TodoItem[];
};

type TodoContextType = {
  todos: TodoItem[];
  addTodo: (parentId: string, title: string) => void;
  deleteTodo: (id: string) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: initialTodoData,
  addTodo: () => {},
  deleteTodo: () => {},
});

export const TodoContextProvider = ({
  children,
  todo,
}: TodoContextProviderProps) => {
  const [todos, setTodos] = useState<TodoItem[]>(todo ?? initialTodoData);

  const addTodo = (parentId: string, title: string) => {
    // Find the parent todo based on parentId
    const parentTodo = findTodoById(parentId, todos);

    if (parentTodo) {
      // Create the new todo
      const newTodo: TodoItem = {
        id: generateUniqueId(),
        title: title,
        todo: [],
      };

      // Add the new todo to the parent todo
      parentTodo.todo.push(newTodo);

      // Update the todos state
      setTodos([...todos]);
    }
  };

  const deleteTodo = (id: string) => {
    // Recursively find and delete the todo with the given id
    const updatedTodos = deleteTodoById(id, todos);

    // Update the todos state
    setTodos(updatedTodos);
  };

  const contextValue: TodoContextType = {
    todos: todos,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

// Helper function to find a todo by id recursively
const findTodoById = (id: string, todos: TodoItem[]): TodoItem | undefined => {
  for (const todo of todos) {
    if (todo.id === id) {
      return todo;
    } else if (todo.todo.length > 0) {
      const foundTodo = findTodoById(id, todo.todo);
      if (foundTodo) {
        return foundTodo;
      }
    }
  }
  return undefined;
};

// Helper function to delete a todo by id recursively
const deleteTodoById = (
  id: string,
  todos: TodoItem[]
): TodoItem[] => {
  return todos.reduce((acc, todo) => {
    if (todo.id === id) {
      // Exclude the todo with the given id
      return acc;
    } else if (todo.todo.length > 0) {
      // Recursively delete todos from the sub-todo list
      const updatedSubTodos = deleteTodoById(id, todo.todo);
      if (updatedSubTodos.length > 0) {
        // Update the sub-todo list if it's not empty
        return [...acc, { ...todo, todo: updatedSubTodos }];
      }
    }
    // Include the todo if it's not the one to be deleted and has no updated sub-todos
    return [...acc, todo];
  }, [] as TodoItem[]);
};

// Helper function to generate a unique ID
function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}