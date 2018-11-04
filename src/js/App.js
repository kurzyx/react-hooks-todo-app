import React, { useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import StoreContext from './StoreContext';
import { usePersistedReducer, useLocationHashChange } from './hooks';
import reducer from './reducer';
import { selectCount, selectActiveCount } from './selectors';
import { changeFilter } from './actions';

export default function App() {
  const [state, dispatch] = usePersistedReducer('state', reducer);

  const count = selectCount(state);
  const activeCount = selectActiveCount(state);

  useLocationHashChange(hash => {
    let newFilter;

    switch (hash) {
      case '#/active':
      case '#active':
        newFilter = 'active';
        break;
      case '#/completed':
      case '#completed':
        newFilter = 'completed';
        break;
      default:
        newFilter = '';
        break;
    }

    const action = changeFilter(newFilter);
    dispatch(action);
  });

  useEffect(() => {
    window.document.title =
      'Todo | ' +
      (activeCount === 1 ? activeCount + ' left' : activeCount + ' left');
  });

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      <div className="todoapp">
        <Header />
        {count > 0 && <Body />}
        {count > 0 && <Footer />}
      </div>
    </StoreContext.Provider>
  );
}
