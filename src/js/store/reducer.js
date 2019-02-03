import { omit, pickBy, mapValues } from 'lodash';
import {
  CREATE_TODO,
  REMOVE_TODO,
  CHANGE_TODO_LABEL,
  CHANGE_TODO_COMPLETED,
  CHANGE_ALL_TODOS_COMPLETED,
  REMOVE_COMPLETED_TODOS,
  CHANGE_FILTER
} from './actionTypes';

const initialState = {
  filter: ''
};

export default function reducer(state = initialState, action) {
  const newTodosState = todosReducer(state.todos, action);
  if (newTodosState !== state.todos) {
    state = {
      ...state,
      todos: newTodosState
    };
  }

  switch (action.type) {
    case CHANGE_FILTER:
      return changeFilter(state, action);
    default:
      return state;
  }
}

function changeFilter(state, { payload }) {
  return {
    ...state,
    filter: payload.filter
  };
}

const initialTodoState = {
  byId: {},
  idIncrement: 0
};

function todosReducer(state = initialTodoState, action) {
  switch (action.type) {
    case CREATE_TODO:
      return createTodo(state, action);
    case REMOVE_TODO:
      return removeTodo(state, action);
    case CHANGE_TODO_LABEL:
      return changeTodoLabel(state, action);
    case CHANGE_TODO_COMPLETED:
      return changeTodoCompleted(state, action);
    case CHANGE_ALL_TODOS_COMPLETED:
      return changeAllTodosCompleted(state, action);
    case REMOVE_COMPLETED_TODOS:
      return removeCompletedTodos(state, action);
    default:
      return state;
  }
}

function createTodo(state, { payload }) {
  const newId = state.idIncrement + 1;

  return {
    byId: {
      ...state.byId,
      [newId]: {
        id: newId,
        label: payload.label,
        completed: false
      }
    },
    idIncrement: newId
  };
}

function removeTodo(state, { payload }) {
  return {
    ...state,
    byId: omit(state.byId, payload.id)
  };
}

function changeTodoLabel(state, { payload }) {
  return {
    ...state,
    byId: {
      ...state.byId,
      [payload.id]: {
        ...state.byId[payload.id],
        label: payload.label
      }
    }
  };
}

function changeTodoCompleted(state, { payload }) {
  return {
    ...state,
    byId: {
      ...state.byId,
      [payload.id]: {
        ...state.byId[payload.id],
        completed: payload.completed
      }
    }
  };
}

function changeAllTodosCompleted(state, { payload }) {
  return {
    ...state,
    byId: mapValues(state.byId, item => {
      return item.completed === payload.completed
        ? item
        : {
            ...item,
            completed: payload.completed
          };
    })
  };
}

function removeCompletedTodos(state) {
  return {
    ...state,
    byId: pickBy(state.byId, item => !item.completed)
  };
}
