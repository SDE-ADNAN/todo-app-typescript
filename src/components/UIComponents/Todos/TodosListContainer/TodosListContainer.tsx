import React, { FC } from "react";
import './TodosListContainer.scss'
import TodoItem from "../TodoItem/TodoListItem";

interface TodoListContainerProps {
    todosArray: {
        title: string;
    }[],
}

const TodosListContainer: React.FC<TodoListContainerProps> = ({ todosArray }) => {
    if (!todosArray) {
        return null
    }
    return (
        <div>
            {todosArray && todosArray.map((item, index) => {
                return (
                    <TodoItem title={item.title} />
                )
            })}
        </div>
    )
}

export default TodosListContainer