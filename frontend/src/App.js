import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
        <Container>
          <Navbar.Brand href="#home">Fitness Progress Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#workouts">Workouts</Nav.Link>
              <Nav.Link href="#weight">Weight</Nav.Link>
              <Nav.Link href="#goals">Goals</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <h1 className="mb-4">Welcome to Fitness Progress Tracker</h1>
        <p>This is a MERN stack app to log workouts, weight, and fitness goals.</p>
        {/* Future components for logging and viewing data will go here */}
      </Container>
    </>
  );
}

export default App;
