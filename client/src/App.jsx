import React, { useState } from 'react';
import styled from 'styled-components';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider as ReduxProvider } from 'react-redux';
import Switch from 'react-switch';
import { MainPage } from './pages';
import { rootReducer } from './store';

// import 'animate.css/animate.css';
import './App.scss';

const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk)),
);

export function App() {
  const [isILS, setIsILS] = useState(true);
  return (
    <ReduxProvider store={store}>
      <AppContainer>
        <Header>BitCoin App</Header>
        <div style={{ flex: 4 }}>
          <MainPage isILS={isILS} />
        </div>
        <TogglerContainer>
          <span>USD</span>
          <Switch
            uncheckedIcon={false}
            checkedIcon={false}
            offColor="000"
            onChange={() => {
              setIsILS(!isILS);
            }}
            checked={isILS}
          />
          <span>ILS</span>
        </TogglerContainer>
      </AppContainer>
    </ReduxProvider>
  );
}

const Header = styled.h1`
  flex: 1;
`;

const TogglerContainer = styled.div`
  display: flex;
  min-width: 150px;
  justify-content:space-between;
  align-items:center;
  margin-bottom: 20px;
  flex: 1.5;
`;

const AppContainer = styled.div`
  background: rgba(40, 40, 200, 0.1);
  min-height: 100vh;
  display: flex;
  padding-top: 5vw;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
`;
