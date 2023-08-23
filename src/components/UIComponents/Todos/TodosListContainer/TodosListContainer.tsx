import React, { useEffect } from "react";
import './TodosListContainer.scss'
import TodoItem from "../TodoItem/TodoListItem";
import { useDispatch } from "react-redux";
// import { setLoading } from "../../../../ReduxStore/UISlice";
import LoaderComponent from "../../LoaderComponent/LoaderComponent";
import { setCurrentPage } from "../../../../ReduxStore/UISlice";

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

// const NoTodosSvg: any = () => <div>dsfdsvsd</div>

const TodosListContainer: React.FC<Partial<TodoListContainerProps>> = ({ todosArray, fetchAllUserData, isSubTodoContainer, parentTodoId = "", fetchParentTodo = () => { } }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        if (isSubTodoContainer) {
            dispatch(setCurrentPage('Todo Details'))
        } else {
            dispatch(setCurrentPage('All Todos'))
        }
    }, [dispatch, isSubTodoContainer])
    return (
        <div className={`todoListItems_container`}>
            {todosArray && todosArray.length === 0 ? '<NoTodosSvg />' : todosArray ? todosArray.map((item, index) => {
                return (
                    <TodoItem isSubTodo={isSubTodoContainer} parentTodoId={parentTodoId} key={item._id} item={item} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} />
                )
            }) : <LoaderComponent />}


        </div>
    )
}

export default TodosListContainer