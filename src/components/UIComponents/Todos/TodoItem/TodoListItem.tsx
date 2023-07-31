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

}

const TodoListItem: React.FC<Partial<TodoListItemProps>> = ({ item, fetchAllUserData }) => {
    const token = useSelector((state: RootState) => state.User.token)
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [yesDelete, setYesDelete] = useState<boolean | null>(null)
    console.log("Called")
    if (!item) {
        return null
    }
    const createdAtDate = new Date(item.createdAt)
    const [date, time] = formatDateAndTime(createdAtDate)


    const handleDelete = () => {
        debugger
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
                    console.log(result)
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
    return (
        <div id={item._id} className='todo_item_individual'>
            <div className='todo_item_title truncate'>{item && item.title}</div>
            <div className='date_and_time' title='Created At'>
                <div className='text'>{date}</div>
                <div className='text'>{time}</div>
            </div>
            <div className="todo_CTAs_container">
                <CrossIcon
                    onClick={() => {
                        console.log("called")
                        setIsOpen(!isOpen);
                    }} />
                <ChevronIcon tooltipText={'Details Page'} />
            </div>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} heading={`Are you sure you want to delete the "${item.title}" TODO ???`}>
                <button style={{ color: 'red' }} onClick={handleDelete}>DELETE</button>
                <button onClick={() => setIsOpen(!isOpen)}>Cancel</button>
            </Modal>
        </div>
    );
};

export default TodoListItem;
