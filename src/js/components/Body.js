import React, { useContext } from 'react';
import { changeAllTodosCompleted } from '../store/actions';
import {
  selectCount,
  selectCompletedCount,
  selectItemsFiltered
} from '../store/selectors';
import StoreContext from '../store/StoreContext';
import TodoList from './TodoList';

export default function Body() {
  const [state, dispatch] = useContext(StoreContext);

  const items = selectItemsFiltered(state);
  const count = selectCount(state);
  const completedCount = selectCompletedCount(state);

  function handleToggleAllChange(e) {
    const action = changeAllTodosCompleted(e.target.checked);
    dispatch(action);
  }

  return (
    <section className="main">
      {count > 0 && (
        <>
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            checked={completedCount === count}
            onChange={handleToggleAllChange}
          />
          <label htmlFor="toggle-all" />
        </>
      )}
      <TodoList items={items} dispatch={dispatch} />
    </section>
  );
}
