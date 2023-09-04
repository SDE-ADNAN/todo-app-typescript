import React, { useEffect } from "react";
import './TodosListContainer.scss'
import TodoItem from "../TodoItem/TodoListItem";
import { useDispatch } from "react-redux";
// import { setLoading } from "../../../../ReduxStore/UISlice";
import LoaderComponent from "../../LoaderComponent/LoaderComponent";
import { setCurrentPage } from "../../../../ReduxStore/UISlice";
import { includeDarkClass } from "../../../../CONFIG";
import { useSelector } from "react-redux";
import { RootState } from "../../../../ReduxStore/store";

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
    fetchParentTodo?: any;
    className?: string;
    title?: string;
}

// const NoTodosSvg: any = () => <div>dsfdsvsd</div>

export const Container: React.FC<Partial<TodoListContainerProps>> = ({ title = '', className = '', todosArray = [], isSubTodoContainer = false, parentTodoId = '', fetchAllUserData = () => { }, fetchParentTodo = () => { } }) => {
    const darkMode = useSelector((state: RootState) => state.UI.theme.dark)
    return (
        <div className={includeDarkClass(`status_container ${className}`, darkMode)}>
            <div className={includeDarkClass(`title`, darkMode)}>{title}</div>
            <div className={includeDarkClass(`all_todos`, darkMode)}>
                {todosArray && todosArray.length === 0 ? 'NoTodosSvg' : todosArray ? todosArray.map((item, index) => {
                    return (
                        <TodoItem isSubTodo={isSubTodoContainer} parentTodoId={parentTodoId} key={item._id} item={item} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} />
                    )
                })
                    :
                    <LoaderComponent />}
            </div>
        </div>
    )
};

const TodosListContainer: React.FC<Partial<TodoListContainerProps>> = ({ todosArray, fetchAllUserData, isSubTodoContainer, parentTodoId = "", fetchParentTodo = () => { } }) => {

    const dispatch = useDispatch()

    const darkMode = useSelector((state: RootState) => state.UI.theme.dark)
    const User = useSelector((state: RootState) => state.User.allUserData)

    console.log(User && User.statusFiltered && User.statusFiltered.__filteredTodos);

    useEffect(() => {
        if (isSubTodoContainer) {
            dispatch(setCurrentPage('Todo Details'))
        } else {
            dispatch(setCurrentPage('All Todos'))
        }
    }, [dispatch, isSubTodoContainer])
    return (
        <div className={includeDarkClass(`todoListItems_container`, darkMode)}>
            {isSubTodoContainer && todosArray ?
                <Container title={'Sub-Todos'} className={'Sub-Todos'} todosArray={todosArray} isSubTodoContainer={isSubTodoContainer} parentTodoId={parentTodoId} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} /> : <>
                    {User && User.statusFiltered && User.statusFiltered.__filteredTodos ?
                        <Container title={'Todo'} className={'Todo'} todosArray={User.statusFiltered.__filteredTodos} isSubTodoContainer={isSubTodoContainer} parentTodoId={parentTodoId} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} /> : <></>
                    }
                    {User && User.statusFiltered && User.statusFiltered.__filteredInProgress ?
                        <Container title={'InProgress'} className={'InProgress'} todosArray={User.statusFiltered.__filteredInProgress} isSubTodoContainer={isSubTodoContainer} parentTodoId={parentTodoId} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} /> : <></>
                    }
                    {User && User.statusFiltered && User.statusFiltered.__filteredCompleted ?
                        <Container title={'Completed'} className={'Completed'} todosArray={User.statusFiltered.__filteredCompleted} isSubTodoContainer={isSubTodoContainer} parentTodoId={parentTodoId} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} /> : <></>
                    }
                    {User && User.statusFiltered && User.statusFiltered.__filteredOnHold ?
                        <Container title={'OnHold'} className={'OnHold'} todosArray={User.statusFiltered.__filteredOnHold} isSubTodoContainer={isSubTodoContainer} parentTodoId={parentTodoId} fetchAllUserData={fetchAllUserData} fetchParentTodo={fetchParentTodo} /> : <></>
                    }
                </>}
        </div>
    )
}

export default TodosListContainer