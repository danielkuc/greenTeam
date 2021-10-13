import React from 'react'
import { Switch, Route } from 'react-router'
import { Login, Register, ResetPass, ForgotPass } from '../../components';

const AuthLayout = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/reset-password" component={ResetPass} />
        <Route path="/forgot-password" component={ForgotPass} />
      </Switch>
    </>
  )
}

export default AuthLayout
