import React, {FC} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {UserModel} from "infrastructure/context";

export type HeaderProps = {
  user?: UserModel,
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: FC<HeaderProps> = ({user, onLogin, onLogout}) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand>Skills Matrix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={window.location.pathname}>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {user && (
            <>
              <LinkContainer to="/matrix">
                <Nav.Link>Matrix</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/person">
                <Nav.Link>Person</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/skill">
                <Nav.Link>Skill</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/experience">
                <Nav.Link>Experience</Nav.Link>
              </LinkContainer>
            </>)}
        </Nav>
        {user ? (
          <>
            <Nav className={"mx-2"}><LinkContainer to={`/profile`}><Nav.Link>{user.username}</Nav.Link></LinkContainer></Nav>
            <Button size="sm" onClick={onLogout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={onLogin}>Log In</Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
