import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
export default function NavBarComponet() {
  return (
    <Navbar bg="light" >
      <Navbar.Brand as={Link} to="/">
        My Drive
    </Navbar.Brand>
      <Nav.Link as={Link} to="/user">
        Profile
    </Nav.Link>
    </Navbar>
  )
}
