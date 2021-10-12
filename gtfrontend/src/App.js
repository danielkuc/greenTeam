import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { GlobalState } from './state';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, Register, Home, ProtectedRoute, ForgotPass, ResetPass } from './components';

function App() {

  return (
    <>
      <GlobalState>
        <Switch>
          {/* user redirected to home from login, if path change here, change in login component as well */}
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/forgot-password" component={ForgotPass} />
          <Route exact path="/reset-password" component={ResetPass} />
          <Route exact path="/dashboard" component={Home} />
        </Switch>
      </GlobalState>
    </>
  );
}

export default App;
