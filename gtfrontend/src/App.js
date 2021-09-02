import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Login, Register } from './components';
import { useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/login" render={(props) => <Login {...props} state={user} setState={setUser}/>} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
}

export default App;
