import React, { Dispatch, SetStateAction, createContext, useState } from "react";
import { TodoItem } from "../App";
import { API_URL_LIVE, API_URL_LOCAL ,isLive} from "../data/api";

const initialTodoData: TodoItem[] = [];

type TodoContextProviderProps = {
  children: React.ReactNode;
  todo?: TodoItem[];
};

type TodoContextType = {
  todos: TodoItem[];
  isLoading:Boolean;
  addTodo: (title: string) => void;
  deleteTodo: (id: string) => void;
  setShowAddInput: (id: string,val: boolean) => void;
  setIsCompleted: (id: string,val: boolean) => void;
  setShowSubTodos: (id: string) => void;
  setNewTitle: (id: string,val: string) => void;
  fetchData:()=> void;
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  addSubTodo:(parentId:string,title: string) => any;
};

export const TodoContext = createContext<TodoContextType>({
  todos: initialTodoData,
  isLoading: true,
  addTodo: () => {},
  deleteTodo: () => {},
  setShowAddInput:() => {},
  setIsCompleted:() => {},
  setShowSubTodos:()=>{},
  setNewTitle:()=>{},
  fetchData:()=>{},
  setTodos:()=>{},
  addSubTodo:()=>{},
});

export const TodoContextProvider = ({
  children,
  todo,
}: TodoContextProviderProps) => {

  // const [todos, setTodos] = useState<TodoItem[]>(todo ?? initialTodoData);
  const [todos , setTodos] = useState<TodoItem[]>([])
  const [isLoading , setIsLoading] = useState<Boolean>(true)

  const getUrl =(remUrl:string) => `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

  const addTodo = async (title: string) => {
    const formData = new FormData();
    formData.append('title',title)
    try {
      const response = await fetch(getUrl("/admin/postTodo"),{
        method:"POST",
        body:formData
      });
      if (!response.ok) {
        setIsLoading(true)
        throw new Error('Request failed');
      }
      const jsonData = await response.json();
      fetchData()
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err);
    }
  };
  const addSubTodo = async (parentId:string,title: string) => {
    const formData = new FormData();
    formData.append('title',title)
    formData.append('parentId',parentId)
    try {
      const response = await fetch(getUrl("/admin/postTodo"),{
        method:"POST",
        body:formData
      });
      if (!response.ok) {
        setIsLoading(true)
        throw new Error('Request failed');
      }
      const jsonData = await response.json();
      fetchData()
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err);
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


const fetchData = async () => {
    try {
      const response = await fetch(API_URL_LOCAL+"/admin/getAllTodos");
      if (!response.ok) {
        setIsLoading(true)
        throw new Error('Request failed');
      }
      const jsonData = await response.json();
      setTodos(jsonData);
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const setShowAddInput = (id: string,val: boolean)=>{
    const ITodo = findTodoById(id, todos);
    if(ITodo){
      ITodo.showInput = val
      const updatedTodos = changeTodoById(id,ITodo,todos)
      setTodos(updatedTodos);
    }
  }
  const setIsCompleted = (id: string,val: boolean)=>{
    const ITodo = findTodoById(id, todos);
    console.log(ITodo)
    if(ITodo){
      ITodo.isCompleted = val
      const updatedTodos = changeTodoById(id,ITodo,todos)
      setTodos(updatedTodos);
    }
  }
  const setShowSubTodos = (id: string)=>{
    const ITodo = findTodoById(id, todos);
    if(ITodo){
      ITodo.showSubtodos = !ITodo.showSubtodos
      const updatedTodos = changeTodoById(id,ITodo,todos)
      setTodos(updatedTodos);
    }
  }
  const setNewTitle = (id: string,val:string)=>{
    const ITodo = findTodoById(id, todos);
    if(ITodo){
      ITodo.title = val
      const updatedTodos = changeTodoById(id,ITodo,todos)
      setTodos(updatedTodos);
    }
  }


  const contextValue: TodoContextType = {
    todos: todos,
    isLoading:isLoading,
    addTodo: addTodo,
    addSubTodo:addSubTodo,
    deleteTodo: deleteTodo,
    setShowAddInput:setShowAddInput,
    setIsCompleted:setIsCompleted,
    setShowSubTodos:setShowSubTodos,
    setNewTitle:setNewTitle,
    fetchData:fetchData,
    setTodos:setTodos,
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