import React from 'react';
import Header from './components/Header';
import Body from './components/Body';
import Footer from './components/Footer';
import reducer from './store/reducer';
import { selectCount, selectActiveCount } from './store/selectors';
import StoreContext from './store/StoreContext';
import { usePersistedReducer, useWindowTitle } from './hooks';

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
