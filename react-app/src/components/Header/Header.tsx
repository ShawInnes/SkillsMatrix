import React, {FC, useContext, useEffect} from 'react';
import {AppBar, Box, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {UserContext, UserContextModel} from "../../context/userContext";
import Button from "../Button/Button";

export type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
  const {setUser, user} = useContext<UserContextModel>(UserContext);

  const handleLogin = () => {
    if (setUser) {
      setUser({
        id: '1',
        username: 'username',
        email: 'user@here.com'
      });
    }
  };

  const handleLogout = () => {
    if (setUser) {
      setUser();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon/>
        </IconButton>
        <Typography style={{flex: 1}}>
          Skills Matrix
        </Typography>
        {user ? (
          <>
            <Typography variant="subtitle1">
              {user.username}
            </Typography>
            <Button onClick={handleLogout}>
              Log Out
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleLogin}>
              Log In
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
