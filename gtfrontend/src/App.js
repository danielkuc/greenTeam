import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, Register } from './components';
import { useState, useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(user !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }      
  }, [user]);

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" render={(props) => <Login {...props} setState={setUser} />} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
