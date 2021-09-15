import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, Register, Home,NavBar, ProtectedRoute, Banner, ForgotPass, ResetPass } from './components';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({
    isLoggedIn: false,
    details:{}
  });

  return (
    <>
      {user.isLoggedIn ? <NavBar state={user.isLoggedIn}/> : <Banner />}
      <Switch>
        <ProtectedRoute exact path="/" component={Home} isLoggedIn={user.isLoggedIn} />
        <Route exact path="/login" render={(props) => <Login {...props} setState={setUser} />} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/forgot-password" component={ForgotPass} />
        <Route exact path="/reset-password" component={ResetPass} />
      </Switch>
    </>
  );
}

export default App;
