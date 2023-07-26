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
  deleteSubTodo: (parentTodoKey: string,id: string) => void;
  putTodo: (changeObj:object,todoId: string) => void;
  postSubTodo: (todoId: string,title:string) => void;
  fetchData:()=> void;
  setTodos: Dispatch<SetStateAction<TodoItem[]>>;
  addSubTodo:(parentId:string,title: string) => any;
};

export const TodoContext = createContext<TodoContextType>({
  todos: initialTodoData,
  isLoading: true,
  addTodo: () => {},
  deleteTodo: () => {},
  deleteSubTodo: () => {},
  putTodo: () => {},
  postSubTodo: () => {},
  fetchData:()=>{},
  setTodos:()=>{},
  addSubTodo:()=>{},
});

export const getUrl =(remUrl:string) => `${isLive ? API_URL_LIVE : API_URL_LOCAL}${remUrl}`

export const TodoContextProvider = ({
  children,
  todo,
}: TodoContextProviderProps) => {

  // const [todos, setTodos] = useState<TodoItem[]>(todo ?? initialTodoData);
  const [todos , setTodos] = useState<TodoItem[]>([])
  const [isLoading , setIsLoading] = useState<Boolean>(true)


  const putTodo = async (changeObj: object,todoId : string) => {
    const formData = new FormData();
  formData.append('todoId', todoId);
  formData.append('changeObj', JSON.stringify(changeObj));

  return fetch(getUrl("/admin/putTodo"), {
    method: 'PUT',
    body: formData,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to update todo.');
    }
    fetchData()
    return response.json();
  })
  .catch((error) => {
    console.error('Error updating todo:', error);
    throw error;
  });
  };
  const postSubTodo =(todoId: string,title: string) => {
    const formData = new FormData();
  formData.append('parentId', todoId);
  formData.append('subTodoTitle', title);

  return fetch(getUrl("/admin/postSubTodo"), {
    method: 'POST',
    body: formData,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to update todo.');
    }
    fetchData()
    return response.json();
  })
  .catch((error) => {
    console.error('Error updating todo:', error);
    throw error;
  });
  };
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
      // const jsonData = await response.json();
      // if(jsonData && jsonData.updatedTodos){
      //   setTodos(jsonData.updatedTodos)
      // }else{
        fetchData()
      // }
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const deleteTodo =async (id: string) => {
    const formData = new FormData();
    formData.append('todoId',id)
    try {
      const response = await fetch(getUrl("/admin/deleteTodo"),{
        method:"DELETE",
        body:formData
      });
      if (!response.ok) {
        setIsLoading(true)
        throw new Error('Request failed');
      }
      // const jsonData = await response.json();
      // if(jsonData && jsonData.updatedTodos){
      //   setTodos(jsonData.updatedTodos)
      // }else{
        fetchData()
      // }
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const deleteSubTodo=async(parentTodoKey:string,id:string)=>{
    const formData = new FormData();
    formData.append('subTodoId',id)
    formData.append('parentTodoId',parentTodoKey)

    try {
      const response = await fetch(getUrl("/admin/deleteSubTodo"),{
        method:"DELETE",
        body:formData
      });
      if (!response.ok) {
        setIsLoading(true)
        throw new Error('Request failed');
      }
        fetchData()
      setIsLoading(false)
    } catch (err) {
      console.error('Error:', err);
    }
  }


const fetchData = async () => {
  try {
    const response = await fetch(getUrl("/admin/getAllTodos"));
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
  const contextValue: TodoContextType = {
    todos: todos,
    isLoading:isLoading,
    addTodo: addTodo,
    putTodo: putTodo,
    postSubTodo: postSubTodo,
    addSubTodo:addSubTodo,
    deleteTodo: deleteTodo,
    deleteSubTodo: deleteSubTodo,
    fetchData:fetchData,
    setTodos:setTodos,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
};

