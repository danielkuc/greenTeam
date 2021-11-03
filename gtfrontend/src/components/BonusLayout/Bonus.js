import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AddBonus } from '../../components';

const Bonus = () => {
  return (
    <>
      <Switch>
        <Route exact path="/dashboard/bonus" component={AddBonus}/>
      </Switch>
    </>
  )
}

export default Bonus
