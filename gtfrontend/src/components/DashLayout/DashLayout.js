import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Switch, Route,useHistory, useLocation } from "react-router-dom";
import { default as NavBar } from '../Navigation';
import { useLoginState, useUserState } from "../../state";
import { Modal, Spinner } from "react-bootstrap";
import { Articles } from '../../components';

const DashLayout = () => {
  const { setUser } = useUserState();
  const { setIsLoggedIn } = useLoginState();
  const history = useHistory();  
  const location = useLocation();
  const [modal, setModal] = useState(true);
  
  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:8000/user', {withCredentials: true})
      .then(response => 
        {
          setIsLoggedIn(true);
          setUser(response.data.user);
          setModal(false);
          history.push(location.pathname);          
        })
      .catch(error => 
          {
            setIsLoggedIn(false);
            setUser({});
            setModal(false);
            history.push('/');
          });

    })();
  },[])


  if (!modal) {
    return (
      <>
        <NavBar />
        <Switch>
          <Route exact path="/dashboard" component={Articles} />
        </Switch>
      </>
    )    
  }

  return (
    <>
    <Modal 
      animation={false} 
      show={modal}
      fullscreen={true}
    />
      <Spinner animation="border" role="status" />
      LOADING...
    </>
  )
}

export default DashLayout;
