import React, { useContext } from 'react';
import FilterList from './FilterList';
import StoreContext from '../StoreContext';
import {
  selectFilter,
  selectActiveCount,
  selectCompletedCount
} from '../selectors';
import { removeCompletedTodos } from '../actions';

export default function Footer() {
  const [state, dispatch] = useContext(StoreContext);

  const filter = selectFilter(state);
  const activeCount = selectActiveCount(state);
  const completedCount = selectCompletedCount(state);

  function handleRemoveCompletedClick() {
    const action = removeCompletedTodos();
    dispatch(action);
  }

  return (
    <footer className="footer">
      <span className="todo-count">
        {activeCount === 1
          ? activeCount + ' todo left'
          : activeCount + " todo's left"}
      </span>
      <FilterList currentFilter={filter} />
      {completedCount > 0 && (
        <button
          className="clear-completed"
          onClick={handleRemoveCompletedClick}
        >
          Clear completed
        </button>
      )}
    </footer>
  );
}
