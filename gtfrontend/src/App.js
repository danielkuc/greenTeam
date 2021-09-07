import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, Register, Home,NavBar, ProtectedRoute } from './components';
import { useState } from 'react';

function App() {

  const [user, setUser] = useState({
    isLoggedIn: false,
    details:{}
  });

  return (
    <div className="App">
      <NavBar state={user.isLoggedIn}/>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} isLoggedIn={user.isLoggedIn} />
        <Route exact path="/login" render={(props) => <Login {...props} setState={setUser} />} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
