import React from 'react';
import { useEffect } from 'react';
import { Redirect, Route, useHistory, useLocation } from 'react-router';
import axios from 'axios';

const ProtectedRoute = ({loginState,setState, component:Component, ...restOfProps}) => {
  const history = useHistory();  
  const location = useLocation();
  
  useEffect(() => {
    (async () => {
      await axios.get('http://localhost:8000/user', {withCredentials: true})
      .then(response => {
        setState(prevState => ({
            isLoggedIn: true,
            details: response.data
          })
        )
        history.push(location.pathname)
      })
      .catch(error => {
        setState(prevState => ({
          isLoggedIn:false,
          details:{}
        }));
        // console.clear();        
      });
    })();
  },[])

  return (
    <Route
      {...restOfProps}
      render={(props) => 
        loginState ? <Component {...props} /> : <Redirect to="/login"/>
      } 
    />   
  )
}

export default ProtectedRoute;
