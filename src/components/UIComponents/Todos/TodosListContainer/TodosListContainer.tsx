import React, { useEffect } from "react";
import './TodosListContainer.scss'
import TodoItem from "../TodoItem/TodoListItem";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../../ReduxStore/UISlice";

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
    fetchAllUserData: any;
    isSubTodoContainer?: boolean;
    parentTodoId?: string;
    fetchParentTodo?: any
}

const TodosListContainer: React.FC<Partial<TodoListContainerProps>> = ({ todosArray, fetchAllUserData, isSubTodoContainer, parentTodoId = "", fetchParentTodo = () => { } }) => {

    const dispatch = useDispatch()

    useEffect(() => {

        dispatch(setLoading(true))
        if (todosArray && todosArray.length > 0) {
            dispatch(setLoading(false))
        }
    }, [dispatch, todosArray])
    return (
        <div className={`todoListItems_container`}>
            {todosArray && todosArray.map((item, index) => {
                return (
                    <TodoItem isSubTodo={isSubTodoContainer} parentTodoId={parentTodoId} key={item._id} item={item} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} />
                )
            })}
        </div>
    )
}

export default TodosListContainer