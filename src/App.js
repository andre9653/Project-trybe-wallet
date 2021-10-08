import React from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

const Main = styled.main`
  display: flex;
`;
function App() {
  return (
    <Main>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </Main>
  );
}

export default App;
