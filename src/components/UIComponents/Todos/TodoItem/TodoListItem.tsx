import React from 'react';
import './TodoItem.scss';
import ChevronIcon from '../../Chevron/ChevronIcon';

interface TodoListItemProps {
    title: string;
}

const TodoListItem: React.FC<TodoListItemProps> = ({ title }) => {
    return (
        <div className='todo_item_individual'>
            <div className='todo_item_title truncate'>{title}</div>
            <div className="todo_CTAs_container">
                <ChevronIcon tooltipText={'Details Page'} />
            </div>
        </div>
    );
};

export default TodoListItem;
