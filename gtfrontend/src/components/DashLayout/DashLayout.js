import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Switch, Route,useHistory, useLocation } from "react-router-dom";
import { default as NavBar } from '../Navigation';
import { useLoginState, useUserState } from "../../state";
import { Modal } from "react-bootstrap";
import { Articles, BonusLayout } from '../../components';

const DashLayout = () => {
  const { setUser } = useUserState();
  const { isLoggedIn, setIsLoggedIn } = useLoginState();
  const history = useHistory();  
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!isLoggedIn) 
    {
      (async () => 
      {
        await axios.get('http://localhost:8000/user', {withCredentials: true})
        .then(response => 
          {
            setIsLoggedIn(true);
            setUser(response.data.user);
            setLoading(false);
            history.push(location.pathname);          
          })
        .catch(error => 
          {
            setIsLoggedIn(false);
            setUser({});
            setLoading(false);
            history.push('/home');
          });
      })();
    }
  },[])


  if (!loading) {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/dashboard" component={Articles} />
          <Route path="/dashboard/bonus" render={(props) => (
              <BonusLayout {...props} loading={loading} />
             )}
          /> 
        </Switch>
      </>
    )    
  }

  return (
    <>
    <Modal 
      animation={false} 
      show={loading}
      fullscreen={true}
    />
    </>
  )
}

export default DashLayout;
