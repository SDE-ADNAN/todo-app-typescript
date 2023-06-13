import React, { createContext, useState } from "react";
import { TodoItem } from "../App";

const initialTodoData: TodoItem[] = [];

type TodoContextProviderProps = {
  children: React.ReactNode;
  todo?: TodoItem[];
};

type TodoContextType = {
  todos: TodoItem[];
  addTodo: (parentId: string, title: string) => void;
  deleteTodo: (id: string) => void;
  setShowAddInput: (id: string,val: boolean) => void;
};

export const TodoContext = createContext<TodoContextType>({
  todos: initialTodoData,
  addTodo: () => {},
  deleteTodo: () => {},
  setShowAddInput:() => {},
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
        isCreated:true,
        showInput:false
      };

      // Add the new todo to the parent todo
      parentTodo.todo.unshift(newTodo);

      // Update the todos state
      setTodos([...todos]);
    }else if(!parentTodo){
      const newTodo: TodoItem = {
        id: generateUniqueId(),
        title: title,
        todo: [],
        isCreated:true,
        showInput:false
      };
      setTodos([...todos,{...newTodo}]);
    }
  };

  const deleteTodo = (id: string) => {
    // Recursively find and delete the todo with the given id
    const updatedTodos = deleteTodoById(id, todos);

    // Update the todos state
    if(updatedTodos.length===0){
      setTodos([])
    }else{
      setTodos(updatedTodos);
    }
 
  };

  const setShowAddInput = (id: string,val: boolean)=>{
    const ITodo = findTodoById(id, todos);
    console.log(ITodo)
    if(ITodo){
      ITodo.showInput = val
      const updatedTodos = changeTodoById(id,ITodo,todos)
      setTodos(updatedTodos);
    }
  }


  const contextValue: TodoContextType = {
    todos: todos,
    addTodo: addTodo,
    deleteTodo: deleteTodo,
    setShowAddInput:setShowAddInput
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
//Helper for changing a todo at a specific id
const changeTodoById = (id: string, updatedTodo: TodoItem, todos: TodoItem[]): TodoItem[] => {
  return todos.map(todo => {
    if (todo.id === id) {
      return updatedTodo;
    } else if (todo.todo.length > 0) {
      return { ...todo, todo: changeTodoById(id, updatedTodo, todo.todo) };
    } else {
      return todo;
    }
  });
};
// Helper function to delete a todo by id recursively
const deleteTodoById = (id: string, todos: TodoItem[]): TodoItem[] => {
  console.log(id)
  console.log(todos)

  return todos.filter(todo => {
    if (todo.id === id) {
      // Exclude the todo with the given id
      return false;
    } else if (todo.todo.length > 0) {
      // Recursively delete todos from the sub-todo list
      todo.todo = deleteTodoById(id, todo.todo);
      return true;
    } else {
      // Include the todo if it's not the one to be deleted
      return true;
    }
  });
};

// Helper function to generate a unique ID
function generateUniqueId(): string {
  const timestamp = new Date().getTime();
  const randomNumber = Math.floor(Math.random() * 100000);
  return `${timestamp}_${randomNumber}`;
}