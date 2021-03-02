import React, {FC} from 'react';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {UserModel} from "infrastructure/context";

export type HeaderProps = {
  user?: UserModel;
  showBreakpoints: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export const Header: FC<HeaderProps> = ({user, showBreakpoints, onLogin, onLogout}) => {
  return (
    <Navbar bg="light">
      <Navbar.Brand>Skills Matrix</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto" activeKey={window.location.pathname}>
          <LinkContainer to="/">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
          {user && user.id && (
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
        {showBreakpoints && (
          <>
            <div className="d-block d-sm-none">XS</div>
            <div className="d-none d-sm-block d-md-none">SM</div>
            <div className="d-none d-md-block d-lg-none">MD</div>
            <div className="d-none d-lg-block d-xl-none">LG</div>
            <div className="d-none d-xl-block">XL</div>
          </>)}
        {user && user.id ? (
          <>
            <Nav className={"mx-2"}><LinkContainer
              to={`/profile`}><Nav.Link>{user.name}</Nav.Link></LinkContainer></Nav>
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
