import React, {FC, useContext, useState} from 'react';
import {UserContext, UserContextModel} from "infrastructure/context";
import {useHistory} from 'react-router-dom';
import {Button, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {msalInstance} from "infrastructure/auth/b2cAuth";
import {PopupRequest} from "@azure/msal-browser";

export type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  const {setUser, user} = useContext<UserContextModel>(UserContext);
  const history = useHistory();

  const handleLogin = async () => {
    const loginRequest: PopupRequest = {scopes: []};
    const loginResult = await msalInstance.loginPopup(loginRequest);
    console.log('loginResult', loginResult);

    if (setUser) {
      // TODO: replace with actual login functionality
      setUser({
        id: '1',
        username: 'username',
        email: 'user@here.com'
      });

      history.push('/matrix');
    }
  };

  const handleLogout = () => {
    if (setUser) {
      // TODO: replace with actual logout functionality
      setUser();

      history.push('/');
    }
  };

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
            <span className={"mx-2"}>{user.username}</span>
            <Button size="sm" onClick={handleLogout}>Log Out</Button>
          </>
        ) : (
          <>
            <Button size="sm" onClick={handleLogin}>Log In</Button>
          </>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}
