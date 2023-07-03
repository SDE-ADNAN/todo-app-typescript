import React, { useEffect, useState } from 'react';
import Todo from "./Todo";
import { TodoItem } from '../App';
import { API_URL_LIVE , API_URL_LOCAL } from '../data/api';
import useTodos from '../hooks/useTodo';

interface TodoListProps {
  todo: TodoItem[];
}

const TodoList: React.FC<TodoListProps> = ({ todo}) => {
  const {todos , error} = useTodos()
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(API_URL_LOCAL+"/admin/getAllTodos");
  //       if (!response.ok) {
  //         throw new Error('Request failed');
  //       }
  //       const jsonData = await response.json();
  //       setTodos(jsonData);
  //       console.log(jsonData)
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <>
    {!error ? <div style={{
    display: "flex",
    flexDirection:"column"
    }} key={new Date().toISOString()}>
      {todos.map((todo) => (
        <Todo todoKey={todo.id} todo={todo}/>
      ))}
    </div> : <h1> LOADING ......</h1>}
    </>
  );
};

export default TodoList;
