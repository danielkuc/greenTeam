import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AddBonus, FetchBonus } from '../../components';
import { Container, Navbar, Nav } from 'react-bootstrap';

const Bonus = () => {
  return (
    <>
      <Navbar>
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/dashboard/bonus">Add new bonus</Nav.Link>
            <Nav.Link href="/dashboard/bonus/fetch">Fetch Bonus</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Switch>
        <Route exact path="/dashboard/bonus" component={AddBonus}/>
        <Route path="/dashboard/bonus/fetch" component={FetchBonus}/>
      </Switch>
    </>
  )
}

export default Bonus
