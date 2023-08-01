import { useParams } from "react-router-dom";
import "./TodoDetails.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/store";
import { formatDateAndTime, getUrl, inCludeDarkClass } from "../../../CONFIG";
import { useEffect, useState } from "react";

interface TodoItem {
    createdAt: string;
    description: string;
    title: string;
    todo: TodoItem[];
    updatedAt: string;
    user: string;
    __v: number;
    _id: string;
}

const TodoDetails: React.FC = () => {
    const [todo, setTodo] = useState<TodoItem | null>(null);
    const params = useParams();
    const token = useSelector((state: RootState) => state.User.token);
    const darkMode = useSelector((state: RootState) => state.UI.theme.dark)
    const fetchGetTodo = (TodoId: string, token: string) => {
        const formData = new FormData();
        formData.append("todoId", TodoId);
        if (token)
            fetch(getUrl("/admin/postGetTodo"), {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: token,
                },
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error("something went wrong");
                    }
                })
                .then((jsonData) => {
                    console.log(jsonData);
                    setTodo(jsonData);
                });
    };
    useEffect(() => {
        if (params.id && token) {
            fetchGetTodo(params.id, token);
        }
    }, [params.id, token]);
    if (!todo) {
        return null;
    }
    return (
        <div className={inCludeDarkClass("todo_details_container", darkMode)}>
            <div className={inCludeDarkClass("todo_id", darkMode)}>
                <div> Todo ID:
                    <div>{params.id}</div>
                </div>
            </div>
            <div className={inCludeDarkClass("horizontal_line", darkMode)}></div>
            <div className={inCludeDarkClass("todo_contents_container", darkMode)}>
                <div className={inCludeDarkClass("todo_title", darkMode)}>
                    <div className={inCludeDarkClass("header", darkMode)}>Title :</div>
                    <div className={inCludeDarkClass("content", darkMode)}>{todo.title}</div>
                    <div className={inCludeDarkClass("horizontal_line", darkMode)}></div>
                </div>
                <div className={inCludeDarkClass("todo_desc", darkMode)}>
                    <div className={inCludeDarkClass("header", darkMode)}>Description :</div>
                    <div className={inCludeDarkClass("content", darkMode)}>{todo.description}</div>
                    <div className={inCludeDarkClass("horizontal_line", darkMode)}></div>
                </div>
                <div className={inCludeDarkClass("todo_subTodos", darkMode)}>
                    <div className={inCludeDarkClass("header", darkMode)}>SubTodos :</div>
                    <div className={inCludeDarkClass("todo_desc_desc", darkMode)}>{todo.todo.length}</div>
                    <div className={inCludeDarkClass("horizontal_line", darkMode)}></div>
                </div>
                <div className={inCludeDarkClass("todo_createdAt", darkMode)}>
                    <div>
                        CreatedAt Date :
                        <div>{formatDateAndTime(new Date(todo.createdAt))}</div>
                    </div>
                </div>
                <div className={inCludeDarkClass("todo_updatedAt", darkMode)}>
                    <div>
                        UpdatedAt Date :
                        <div>{formatDateAndTime(new Date(todo.updatedAt))}</div>
                        <div className={inCludeDarkClass("horizontal_line", darkMode)}></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodoDetails;
