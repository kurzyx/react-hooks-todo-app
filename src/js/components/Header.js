import React, { useContext, useRef } from 'react';
import { createTodo } from '../store/actions';
import StoreContext from '../store/StoreContext';

export default function Header() {
  const [, dispatch] = useContext(StoreContext);
  const createTodoInputRef = useRef();

  function handleCreateTodoKeyPress(e) {
    if (e.nativeEvent.keyCode === 13) {
      const value = createTodoInputRef.current.value.trim();

      if (value === '') {
        return;
      }

      const action = createTodo(value);
      dispatch(action);

      createTodoInputRef.current.value = '';
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <input
        ref={createTodoInputRef}
        className="new-todo"
        placeholder="What needs to be done?"
        onKeyPress={handleCreateTodoKeyPress}
      />
    </header>
  );
}
