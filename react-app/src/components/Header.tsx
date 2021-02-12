import React from 'react';
import './header.css';
import {Link as RouterLink} from "react-router-dom";
import Button from './Button';

export interface HeaderProps {
    user?: {};
    onLogin: () => void;
    onLogout: () => void;
    onCreateAccount: () => void;
}

export const Header: React.FC<HeaderProps> = ({user, onLogin, onLogout, onCreateAccount}) => {
    return (
        <header>
            <div className="wrapper">
                <div>
                    <h1>Skills Matrix</h1>
                </div>
                <div>
                    <RouterLink to="/">
                        <Button>Home</Button>
                    </RouterLink>
                    {user ? (
                        <>
                            <RouterLink to="/about">
                                <Button>About</Button>
                            </RouterLink>
                            <RouterLink to="/user">
                                <Button>Users</Button>
                            </RouterLink>
                        </>
                    ) : (<></>)}
                </div>
                <div>
                    {user ? (
                        <Button onClick={onLogout}>
                            Log Out
                        </Button>
                    ) : (
                        <>
                            <Button onClick={onLogin}>
                                Log In
                            </Button>
                            <Button onClick={onCreateAccount}>
                                Sign Up
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
