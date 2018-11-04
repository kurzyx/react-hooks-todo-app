import {
  CREATE_TODO,
  REMOVE_TODO,
  CHANGE_TODO_LABEL,
  CHANGE_TODO_COMPLETED,
  CHANGE_ALL_TODOS_COMPLETED,
  REMOVE_COMPLETED_TODOS,
  CHANGE_FILTER
} from './actionTypes';

export function createTodo(label) {
  return {
    type: CREATE_TODO,
    payload: { label }
  };
}

export function removeTodo(id) {
  return {
    type: REMOVE_TODO,
    payload: { id }
  };
}

export function changeTodoLabel(id, label) {
  return {
    type: CHANGE_TODO_LABEL,
    payload: { id, label }
  };
}

export function changeTodoCompleted(id, completed) {
  return {
    type: CHANGE_TODO_COMPLETED,
    payload: { id, completed }
  };
}

export function changeAllTodosCompleted(completed) {
  return {
    type: CHANGE_ALL_TODOS_COMPLETED,
    payload: { completed }
  };
}

export function removeCompletedTodos() {
  return {
    type: REMOVE_COMPLETED_TODOS
  };
}

export function changeFilter(filter) {
  return {
    type: CHANGE_FILTER,
    payload: { filter }
  };
}
