import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useUserState, useLoginState } from "../../state";

const NavBar = () => {

  // access to state context, deconstructed.
    const { user, setUser } = useUserState();
    const { loggedIn, setLoggedIn } = useLoginState();
    const { first_name, last_name } = user;
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="success" variant="dark" className={`mb-5 mt-3 `}>
        <Container>
          <Navbar.Brand href="/dashboard">The Green Team</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" >
            <Nav className="me-auto" >
              <Nav.Link href="dashboard/bonus">Bonus</Nav.Link>
              <Nav.Link href="/links">Useful Links</Nav.Link>
              <Nav.Link href="/clinical">Clinical</Nav.Link>
            </Nav>
            <Nav >
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
