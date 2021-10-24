import React from 'react'
import { Switch, Route } from 'react-router'
import { Login, Register, ResetPass, ForgotPass, Banner } from '../../components';

const AuthLayout = () => {
  return (
    <>
      <Banner />
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/reset-password" component={ResetPass} />
        <Route exact path="/forgot-password" component={ForgotPass} />
      </Switch>
    </>
  )
}

export default AuthLayout
