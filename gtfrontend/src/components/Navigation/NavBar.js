import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';


const NavBar = ({ state }) => {
  return (
    <>
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" className={`${!state ? 'd-none' : null}`}>
        <Container>
          <Navbar.Brand href="/">The Green Team</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='me-auto'>
              <Nav.Link href="/bonus">Bonus</Nav.Link>
              <Nav.Link href="/links">Useful Links</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="#deets">More deets</Nav.Link>
              <Nav.Link href="#memes">Dank memes</Nav.Link>
              <Navbar.Text>
                Signed in as: <a href="/account">Mark Otto</a>
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar;
