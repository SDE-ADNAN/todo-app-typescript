import { useParams } from "react-router-dom";
import "./TodoDetails.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../ReduxStore/store";
import { formatDateAndTime, getUrl, includeDarkClass } from "../../../CONFIG";
import { useEffect, useState } from "react";
import TodosListContainer from "../Todos/TodosListContainer/TodosListContainer";
import Modal from "../Modal/Modal";
import AddIcon from "../AddIcon/AddIcon";
import { useDispatch } from "react-redux";
import { setCurrentPage, setLoading } from "../../../ReduxStore/UISlice";
import LoaderComponent from "../LoaderComponent/LoaderComponent";
import CTAIconWrapper from "../../WRAPPERS/CTAIconWrapper/CTAIconWrapper";
import Editsvg from "../../../medias/Editsvg";

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
    const [createdAtdateAndTime, setCreatedAtDateAndTime] =
        useState<Array<string> | null>(null);
    const [updatedAtdateAndTime, setUpdatedAtDateAndTime] =
        useState<Array<string> | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [subTodoTitleInput, setSubTodoTitleInput] = useState<string | null>(
        null
    );
    const [subTodoDescInput, setSubTodoDescInput] = useState<string | null>(null);
    // State for input fields
    const [titleInput, setTitleInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const params = useParams();
    const dispatch = useDispatch();
    const token = useSelector((state: RootState) => state.User.token);
    const darkMode = useSelector((state: RootState) => state.UI.theme.dark);
    const fetchParentTodo = (TodoId: string, token: string) => {
        const formData = new FormData();
        formData.append("todoId", TodoId);
        // console.log("Called");
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
                    // console.log(jsonData);
                    setTodo(jsonData);
                    setCreatedAtDateAndTime(
                        formatDateAndTime(new Date(jsonData.createdAt))
                    );
                    setUpdatedAtDateAndTime(
                        formatDateAndTime(new Date(jsonData.updatedAt))
                    );
                });
    };
    const fetchChildTodo = (TodoId: string, token: string) => {
        const formData = new FormData();
        formData.append("todoId", TodoId);
        if (token)
            fetch(getUrl("/admin/postGetSubTodo"), {
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
                    // console.log(jsonData);
                    setTodo(jsonData);
                    setCreatedAtDateAndTime(
                        formatDateAndTime(new Date(jsonData.createdAt))
                    );
                    setUpdatedAtDateAndTime(
                        formatDateAndTime(new Date(jsonData.updatedAt))
                    );
                });
    };

    const handleAddSubTodo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setLoading(true));
        if (subTodoTitleInput && subTodoDescInput && params.parentTodo_id) {
            const formData = new FormData();
            formData.append("parentId", params.parentTodo_id);
            formData.append("subTodoTitle", subTodoTitleInput);
            formData.append("subTodoDescription", subTodoDescInput);

            try {
                if (token !== null) {
                    const response = await fetch(getUrl("/admin/postSubTodo"), {
                        method: "POST",
                        body: formData,
                        headers: {
                            Authorization: token,
                        },
                    });
                    if (!response.ok) {
                        dispatch(setLoading(false));

                        setIsOpen(false);
                        throw new Error("Request failed");
                    }
                    // const jsonData = await response.json();
                    dispatch(setLoading(false));
                    setIsOpen(false);
                    // fetchAllUserData(token)
                    fetchParentTodo(params.parentTodo_id, token);
                    // console.log(jsonData);
                }
            } catch (err) {
                console.error("Error:", err);
                dispatch(setLoading(false));
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        if (todo && todo.title && todo.description) {
            setTitleInput(todo.title);
            setDescriptionInput(todo.description);
        }
    }, [todo]);

    const handleUpdateSubmit = async (
        event: React.FormEvent<HTMLFormElement>
    ) => {
        event.preventDefault();
        dispatch(setLoading(true));
        if (isEditing) {
            try {
                if (token !== null) {
                    const formData = new FormData();

                    if (params.childTodo_id) {
                        // Update a childTodo
                        formData.append("todoId", params.childTodo_id);
                        // formData.append("title", titleInput);
                        // formData.append("description", descriptionInput);
                        formData.append(
                            "changeObj",
                            JSON.stringify({
                                title: titleInput,
                                description: descriptionInput,
                            })
                        );

                        const response = await fetch(getUrl("/admin/putSubTodo"), {
                            method: "PUT",
                            body: formData,
                            headers: {
                                Authorization: token,
                            },
                        });

                        if (!response.ok) {
                            dispatch(setLoading(false));
                            setIsEditing(false);
                            setIsOpen(false);
                            throw new Error("Request failed");
                        }

                        // Fetch updated childTodo after successful API call
                        fetchChildTodo(params.childTodo_id, token);
                    } else if (params.parentTodo_id) {
                        // Update a parentTodo
                        formData.append("todoId", params.parentTodo_id);
                        // formData.append("title", titleInput);
                        // formData.append("description", descriptionInput);
                        formData.append(
                            "changeObj",
                            JSON.stringify({
                                title: titleInput,
                                description: descriptionInput,
                            })
                        );

                        const response = await fetch(getUrl("/admin/putTodo"), {
                            method: "PUT",
                            body: formData,
                            headers: {
                                Authorization: token,
                            },
                        });

                        if (!response.ok) {
                            dispatch(setLoading(false));
                            setIsEditing(false);
                            setIsOpen(false);
                            throw new Error("Request failed");
                        }

                        // Fetch updated parentTodo after successful API call
                        fetchParentTodo(params.parentTodo_id, token);
                    }

                    dispatch(setLoading(false));
                    setIsEditing(false);
                    setIsOpen(false);
                }
            } catch (err) {
                console.error("Error:", err);
                dispatch(setLoading(false));
                setIsEditing(false);
                setIsOpen(false);
            }
        }
    };

    useEffect(() => {
        if (token) {
            if (params.parentTodo_id && !params.childTodo_id) {
                fetchParentTodo(params.parentTodo_id, token);
            } else if (params.parentTodo_id && params.childTodo_id) {
                fetchChildTodo(params.childTodo_id, token);
                dispatch(setCurrentPage("Sub-Todo Details"));
            }
        }
    }, [dispatch, params.childTodo_id, params.parentTodo_id, token]);
    if (!todo) {
        return <LoaderComponent />;
    }
    return (
        <div className={includeDarkClass("todo_details_container", darkMode)}>
            <form style={{ width: "100%" }} onSubmit={handleUpdateSubmit}>
                <div className={includeDarkClass("todo_id", darkMode)}>
                    {" "}
                    Todo ID:
                    {params.parentTodo_id}
                    <CTAIconWrapper onClick={() => setIsEditing(!isEditing)}>
                        <Editsvg />
                    </CTAIconWrapper>
                </div>
                <div className={includeDarkClass("horizontal_line", darkMode)}></div>
                <div className={includeDarkClass("todo_contents_container", darkMode)}>
                    <div className={includeDarkClass("todo_title", darkMode)}>
                        <div className={includeDarkClass("header", darkMode)}>Title :</div>
                        <div className={includeDarkClass("content", darkMode)}>
                            {!isEditing ? (
                                todo.title
                            ) : (
                                <input
                                    type="text"
                                    value={titleInput}
                                    onChange={(e) => setTitleInput(e.target.value)}
                                ></input>
                            )}
                        </div>
                        <div
                            className={includeDarkClass("horizontal_line", darkMode)}
                        ></div>
                    </div>
                    <div className={includeDarkClass("todo_desc", darkMode)}>
                        <div className={includeDarkClass("header", darkMode)}>
                            Description :
                        </div>
                        <div className={includeDarkClass("content", darkMode)}>
                            {!isEditing ? (
                                todo.description
                            ) : (
                                <textarea
                                    rows={10}
                                    cols={50}
                                    value={descriptionInput}
                                    onChange={(e) => setDescriptionInput(e.target.value)}
                                ></textarea>
                            )}
                        </div>


                        <div
                            className={includeDarkClass("horizontal_line", darkMode)}
                        ></div>
                    </div>
                    {isEditing ? (
                        <div className={includeDarkClass("btn_grp", darkMode)}>
                            <button type="submit">Submit</button>
                            <button
                                type={undefined}
                                onClick={() => {
                                    setIsEditing(false);
                                    setTitleInput(todo.title);
                                    setDescriptionInput(todo.description);
                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                    {createdAtdateAndTime && updatedAtdateAndTime && (
                        <div
                            className={includeDarkClass(
                                "todo_date_and_time_container",
                                darkMode
                            )}
                        >
                            <div className={includeDarkClass("todo_createdAt", darkMode)}>
                                <div className={includeDarkClass("header", darkMode)}>
                                    CreatedAt
                                </div>
                                <div className={includeDarkClass("date", darkMode)}>
                                    {createdAtdateAndTime[0]}
                                </div>
                                <div className={includeDarkClass("time", darkMode)}>
                                    {createdAtdateAndTime[1]}
                                </div>
                            </div>
                            <div className={includeDarkClass("todo_updatedAt", darkMode)}>
                                <div className={includeDarkClass("header", darkMode)}>
                                    UpdatedAt
                                </div>
                                <div className={includeDarkClass("date", darkMode)}>
                                    {updatedAtdateAndTime[0]}
                                </div>
                                <div className={includeDarkClass("time", darkMode)}>
                                    {updatedAtdateAndTime[1]}
                                </div>
                            </div>
                        </div>
                    )}
                    <div className={includeDarkClass("horizontal_line", darkMode)}></div>
                    {params.parentTodo_id && !params.childTodo_id ? (
                        <div className={includeDarkClass("todo_subTodos", darkMode)}>
                            <div className={includeDarkClass("subTodo_addbtn", darkMode)}>
                                <div className={includeDarkClass("header", darkMode)}>
                                    SubTodos :
                                </div>
                                <div style={{ margin: "5px 0" }} className="button_wrapper">
                                    <button type={undefined} onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}>
                                        <div className="btn_text">Add Sub-Todo</div>
                                        <AddIcon size={20} showToolTip={false} />
                                    </button>
                                </div>
                            </div>

                            <div className={includeDarkClass("todo_desc_desc", darkMode)}>
                                <TodosListContainer
                                    isSubTodoContainer
                                    parentTodoId={params.parentTodo_id}
                                    todosArray={todo.todo}
                                    fetchParentTodo={fetchParentTodo}
                                />
                            </div>
                            {/* <div className={includeDarkClass("horizontal_line", darkMode)}></div> */}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <Modal
                    heading="Add a new Todo"
                    isOpen={isOpen}
                    onClose={() => setIsOpen(!isOpen)}
                >
                    <div className="addTodo_form_container">
                        <form onSubmit={handleAddSubTodo}>
                            <input
                                required
                                onChange={(e) => setSubTodoTitleInput(e.target.value)}
                                type="text"
                                placeholder="Title for your new subTodo ."
                            />
                            <input
                                required
                                onChange={(e) => setSubTodoDescInput(e.target.value)}
                                type="textarea"
                                placeholder="Description for your new subTodo ."
                            />
                            <div>
                                <button>Submit</button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </form>
        </div>
    );
};

export default TodoDetails;
