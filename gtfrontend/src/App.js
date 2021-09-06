import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, Register, Home, ProtectedRoute } from './components';
import { useState } from 'react';

function App() {
  // const [user, setUser] = useState(null);
  const [user, setUser] = useState({
    isLoggedIn: false,
    details:{}
  });
  // const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="App">
      <Switch>
        <ProtectedRoute exact path="/" component={Home} isLoggedIn={user.isLoggedIn} />
        <Route exact path="/login" render={(props) => <Login {...props} setState={setUser} />} />
        <Route exact path="/register" component={Register} />
      </Switch>
      <button className="btn btn-primary" onClick={() => {
        console.log(user)
        }}>State</button>
    </div>
  );
}

export default App;
