import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NewBonus } from '../../components';

const Bonus = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard/bonus" component={NewBonus}/>
      </Switch>
    </>
  )
}

export default Bonus
