import React, { useState } from 'react';
import styled from 'styled-components';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider as ReduxProvider } from 'react-redux';
import { MainPage } from './pages';
import { rootReducer } from './store';
import { Toggle } from './components';
import { useWindowSize } from './hooks';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk)),
);

export function App() {
  const size = useWindowSize();
  const [isILS, setIsILS] = useState(true);

  const handleChangeSetIls = () => {
    setIsILS(!isILS);
  };

  return (
    <ReduxProvider store={store}>
      <AppContainer>
        <Header>BitCoin App</Header>
        <div style={{ flex: 4, paddingBottom: '30px' }}>
          <MainPage size={size} isILS={isILS} toggleCurrency={handleChangeSetIls} />
        </div>
        <Toggle
          isILS={isILS}
          handleChangeSetIls={handleChangeSetIls}
        />
      </AppContainer>
    </ReduxProvider>
  );
}

export default App;

const Header = styled.h1`
  flex: 0.5;
  color: rgba(255, 255, 255, 0.8);
`;

const AppContainer = styled.div`
  background: #808080;
  min-height: 100vh;
  display: flex;
  padding-top: 50px;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
`;
