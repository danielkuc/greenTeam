import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Login, Register, ResetPass, ForgotPass, Banner } from '../../components';

const AuthLayout = () => {
  return (
    <>
      <Banner />
      <Switch>
        <Route exact path="/home" component={Login} />
        <Route exact path="/home/register" component={Register} />
        <Route exact path="/home/reset-password" component={ResetPass} />
        <Route exact path="/home/forgot-password" component={ForgotPass} />
      </Switch>
    </>
  )
}

export default AuthLayout
