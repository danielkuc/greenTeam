import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { GlobalState } from './state';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthLayout, DashLayout } from './components';

function App() {

  return (
    <>
      <GlobalState>
        <Switch>
          <Route path="/home" component={AuthLayout} />
          <Route exact path="/">
            <Redirect to="/home"/>
          </Route>
          <Route path="/dashboard" component={DashLayout} />
        </Switch>
      </GlobalState>
    </>
  );
}

export default App;
