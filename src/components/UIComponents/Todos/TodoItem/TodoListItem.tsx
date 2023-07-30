import React from 'react';
import './TodoItem.scss';
import ChevronIcon from '../../Chevron/ChevronIcon';

interface TodoListItemProps {
    item: {
        createdAt: string;
    title: string;
        todo: any[];
        updatedAt: string;
        user: string;
        __v: number;
        _id: string;
    }

}

const TodoListItem: React.FC<Partial<TodoListItemProps>> = ({ item }) => {
    if (!item) {
        return null
    }
    return (
        <div id={item._id} className='todo_item_individual'>
            <div className='todo_item_title truncate'>{item && item.title}</div>
            <div className="todo_CTAs_container">
                <ChevronIcon tooltipText={'Details Page'} />
            </div>
        </div>
    );
};

export default TodoListItem;
