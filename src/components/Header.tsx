import React from 'react';
import Button from './Button';
import './header.css';
import {
  Link
} from "react-router-dom";

export interface HeaderProps {
  user?: {};
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogin, onLogout, onCreateAccount }) => {
  return (
    <header>
      <div className="wrapper">
        <div>
          <h1>Skills Matrix</h1>
        </div>
        <div>
          <Button mr={1} size="small" variant="contained" color="primary"><Link to="/" >Home</Link></Button>
          <Button mr={1} size="small" variant="contained" color="primary"><Link to="/about" >About</Link></Button>
          <Button mr={1} size="small" variant="contained" color="primary"><Link to="/users" >Users</Link></Button>
        </div>
        <div>
          {user ? (
            <Button size="small" variant="contained" color="primary" onClick={onLogout} >
              Log Out
            </Button>
          ) : (
              <>
                <Button mr={1} size="small" variant="contained" color="primary" onClick={onLogin}>
                  Log In
            </Button>
                <Button size="small" variant="contained" color="primary" onClick={onCreateAccount}>
                  Sign Up
            </Button>
              </>
            )}
        </div>
      </div>
    </header>
  );
}
