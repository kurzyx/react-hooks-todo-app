import React, { useEffect } from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import StoreContext from './StoreContext';
import { usePersistedReducer, useWindowTitle } from './hooks';
import reducer from './reducer';
import { selectCount, selectActiveCount } from './selectors';

export default function App() {
  const [state, dispatch] = usePersistedReducer('state', reducer);

  const count = selectCount(state);
  const activeCount = selectActiveCount(state);

  useWindowTitle(
    'Todo | ' + (activeCount === 1 ? activeCount + ' left' : activeCount + ' left')
  );

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
