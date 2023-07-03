import { useEffect, useState } from "react";
import { TodoItem } from "../App";
import { API_URL_LOCAL } from "../data/api";

function useTodos() {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(API_URL_LOCAL + "/admin/getAllTodos", {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data);
        setError(null);
      } catch (error) {
        setError("Error fetching todos");
      }
    };

    fetchTodos();

    const intervalId = setInterval(fetchTodos, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return { todos, error };
}

export default useTodos;
