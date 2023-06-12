import { createContext } from "react";
import { TodoItem } from "../App";

const initialTodoData: TodoItem[] = [
  {
    id: "1",
    title: "Todo no.1",
    todo: [
      {
        id: "2",
        title: "Todo no.1",
        todo: [],
      },
      {
        id: "3",
        title: "Todo no.1",
        todo: [
          {
            id: "4",
            title: "Todo no.1",
            todo: [
              {
                id: "5",
                title: "Todo no.1",
                todo: [],
              },
            ],
          },
        ],
      },
      {
        id: "6",
        title: "Todo no.1",
        todo: [],
      },
    ],
  },
];

type TodoContextProviderProps = {
  children: React.ReactNode;
  todo?: TodoItem[];
};

export const TodoContext = createContext<TodoItem[]>(initialTodoData);

export const TodoContextProvider = ({
  children,
  todo,
}: TodoContextProviderProps) => {
  return (
    <TodoContext.Provider value={todo ?? initialTodoData}>
      {children}
    </TodoContext.Provider>
  );
};
