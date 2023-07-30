import React from "react";
import './TodosListContainer.scss'
import TodoItem from "../TodoItem/TodoListItem";

interface TodoListContainerProps {
    todosArray: {
        createdAt: string;
        title: string;
        todo: any[];
        updatedAt: string;
        user: string;
        __v: number;
        _id: string;
    }[],
}

const TodosListContainer: React.FC<Partial<TodoListContainerProps>> = ({ todosArray }) => {
    if (!todosArray) {
        return null
    }
    return (
        <div>
            {todosArray && todosArray.map((item, index) => {
                return (
                    <TodoItem key={item._id} item={item} />
                )
            })}
        </div>
    )
}

export default TodosListContainer