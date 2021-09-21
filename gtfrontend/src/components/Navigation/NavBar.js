import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NavBar = ({ state, user }) => {
  const { first_name, last_name } = user.details;
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="success" variant="dark" className={`mb-5 mt-3 ${!state ? 'd-none' : null}`}>
        <Container>
          <Navbar.Brand href="/">The Green Team</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/bonus">Bonus</Nav.Link>
              <Nav.Link href="/links">Useful Links</Nav.Link>
              <Nav.Link href="/clinical">Clinical</Nav.Link>
            </Nav>
            <Nav>
              <Navbar.Text>
                Signed in as: <Link to="/account">{`${first_name} ${last_name}`}</Link>
              </Navbar.Text>
                <Nav.Link>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;
