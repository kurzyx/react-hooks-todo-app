export function selectFilter(state) {
  return state.filter;
}

export function selectItems(state) {
  return Object.values(state.todos.byId);
}

export function selectItemsFiltered(state) {
  return selectItems(state).filter(
    item =>
      state.filter === '' ||
      (state.filter === 'active' && !item.completed) ||
      (state.filter === 'completed' && item.completed)
  );
}

export function selectCount(state) {
  return selectItems(state).length;
}

export function selectActiveCount(state) {
  return selectItems(state).filter(item => !item.completed).length;
}

export function selectCompletedCount(state) {
  return selectItems(state).filter(item => item.completed).length;
}
