import { useReducer, useEffect, useMemo } from 'react';

export function usePersistedReducer(key, reducer) {
  // Initially load the persisted state from the local storage.
  const initialState = useMemo(() => {
    const persistedState = localStorage.getItem(key);

    return persistedState
      ? JSON.parse(persistedState)
      : reducer(undefined, { type: '_INITIALIZE' });
  }, []);

  const [state, dispatch] = useReducer(reducer, initialState);

  // Persist the state every time it changes.
  useEffect(
    () => {
      localStorage.setItem(key, JSON.stringify(state));
    },
    [state]
  );

  return [state, dispatch];
}

export function useLocationHashChange(onChangeFilter) {
  useEffect(() => {
    const handler = () => {
      onChangeFilter(window.location.hash);
    };
    window.addEventListener('hashchange', handler);

    // Immediately trigger the callback.
    handler();

    return () => window.removeEventListener('hashchange', handler);
  }, []);
}

export function useWindowTitle(title) {
  useEffect(() => {
    window.document.title = title;
  }, [title]);
}
