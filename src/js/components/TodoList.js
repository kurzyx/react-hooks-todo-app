import React from 'react';
import { changeTodoLabel, changeTodoCompleted, removeTodo } from '../store/actions';
import TodoListItem from './TodoListItem';

export default function TodoList(props) {
  const { items, dispatch } = props;

  return (
    <ul className="todo-list">
      {items.map(item => (
        <TodoListItem
          key={item.id}
          label={item.label}
          completed={item.completed}
          onLabelChange={label => {
            const action = changeTodoLabel(item.id, label);
            dispatch(action);
          }}
          onCompletedToggle={() => {
            const action = changeTodoCompleted(item.id, !item.completed);
            dispatch(action);
          }}
          onRemove={() => {
            const action = removeTodo(item.id);
            dispatch(action);
          }}
        />
      ))}
    </ul>
  );
}
