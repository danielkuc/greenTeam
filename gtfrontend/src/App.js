import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalState } from './state';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthLayout, DashLayout } from './components';

function App() {

  return (
    <>
      <GlobalState>
        <Switch>
          <Route path="/" component={AuthLayout} />
          <Route path="/dashboard" component={DashLayout} />
        </Switch>
      </GlobalState>
    </>
  );
}

export default App;
