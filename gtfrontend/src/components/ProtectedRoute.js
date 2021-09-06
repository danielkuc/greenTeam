import React from 'react';
import { Redirect, Route } from 'react-router';

const ProtectedRoute = ({isLoggedIn, component:Component, ...restOfProps}) => {

  return (
    <Route
      {...restOfProps}
      render={(props) => 
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login"/>
      } 
    />   
  )
}

export default ProtectedRoute;
