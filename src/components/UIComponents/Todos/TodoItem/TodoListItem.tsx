import React, { useState } from 'react';
import './TodoItem.scss';
import ChevronIcon from '../../Chevron/ChevronIcon';
import { formatDateAndTime, getUrl } from '../../../../CONFIG';
import CrossIcon from '../../CrossIcon/CrossIcon';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../ReduxStore/store';
import { setLoading } from '../../../../ReduxStore/UISlice';
import { useDispatch } from 'react-redux';
import Modal from '../../Modal/Modal';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

interface TodoListItemProps {
    item: {
        createdAt: string;
        title: string;
        todo: any[];
        updatedAt: string;
        user: string;
        __v: number;
        _id: string;
    },
    fetchAllUserData: any,
    isSubTodo: boolean;
    parentTodoId: string;
    fetchParentTodo?: any;

}

const TodoListItem: React.FC<Partial<TodoListItemProps>> = ({ item, fetchAllUserData, isSubTodo, parentTodoId = "", fetchParentTodo = () => { } }) => {
    const token = useSelector((state: RootState) => state.User.token)
    const theme = useSelector((state: RootState) => state.UI.theme)
    // console.log(item)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    if (!item || !item.title || !item.createdAt) {
        return null
    }
    const createdAtDate = new Date(item.createdAt)
    const [date, time] = formatDateAndTime(createdAtDate)


    const handleParentDelete = () => {
        if (token) {
            dispatch(setLoading(true))
            var formdata = new FormData();
            formdata.append("todoId", item._id);
            fetch(getUrl("/admin/deleteTodo"), {
                method: 'DELETE',
                body: formdata,
                headers: {
                    'Authorization': token
                }
            }).then(response => response.json())
                .then(result => {
                    // console.log(result)
                    fetchAllUserData(token)
                    dispatch(setLoading(false));
                    setIsOpen(false)
                })
                .catch(error => console.log('error', error));
            dispatch(setLoading(false));
            setIsOpen(false)
        } else {
            console.error('No token Present')
        }
    }
    const handleChildTodoDelete = () => {
        if (token) {
            dispatch(setLoading(true))
            var formdata = new FormData();
            formdata.append("subTodoId", item._id);
            formdata.append("parentTodoId", parentTodoId);
            fetch(getUrl("/admin/deleteSubTodo"), {
                method: 'DELETE',
                body: formdata,
                headers: {
                    'Authorization': token
                }
            }).then(response => response.json())
                .then(result => {
                    // console.log(result)
                    // fetchAllUserData(token)
                    fetchParentTodo(parentTodoId, token)
                    dispatch(setLoading(false));
                    setIsOpen(false)
                })
                .catch(error => console.log('error', error));
            dispatch(setLoading(false));
            setIsOpen(false)
        } else {
            console.error('No token Present')
        }
    }
    const handleRedirect = () => {
        const id = item._id;
        if (!isSubTodo) {
            navigate(`/todos/${id}`)
        } else {
            navigate(`/todos/${parentTodoId}/subTodo/${id}`)
        }
    }
    return (
        <motion.div
            initial={{ y: -30, opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ /*type: "spring", stiffness: 100,*/ duration: .5 }}
            id={item._id} className={`todo_item_individual ${theme.dark ? 'dark' : 'light'}`}>
            <div className={`todo_item_title truncate ${theme.dark ? 'dark' : 'light'}`}>{item && item.title}</div>
            <div className={`date_and_time ${theme.dark ? 'dark' : 'light'}`} title='Created At'>
                <div className={`text ${theme.dark ? 'dark' : 'light'}`}>{date}</div>
                <div className={`text ${theme.dark ? 'dark' : 'light'}`}>{time}</div>
            </div>
            <div className={`todo_CTAs_container ${theme.dark ? 'dark' : 'light'}`}>
                <CrossIcon
                    onClick={() => {
                        // console.log("called")
                        setIsOpen(!isOpen);
                    }} />
                <ChevronIcon onClick={handleRedirect} tooltipText={'Details Page'} />
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} heading={`Are you sure you want to delete the "${item.title}" TODO ???`}>
                <button style={{ color: 'red' }} onClick={() => {
                    if (isSubTodo && parentTodoId) {
                        handleChildTodoDelete()
                    } else {
                        handleParentDelete()
                    }
                }}>DELETE</button>
                <button onClick={() => setIsOpen(!isOpen)}>Cancel</button>
            </Modal>
        </motion.div>
    );
};

export default TodoListItem;
