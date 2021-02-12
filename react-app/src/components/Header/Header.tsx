import React from 'react';
import './_Header.scss';
import {Link as RouterLink} from "react-router-dom";
import Button from '../Button/Button';

export interface HeaderProps {
    user?: string;
    onLogin: () => void;
    onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({user, onLogin, onLogout}) => {
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
                            <RouterLink to="/users">
                                <Button>Users</Button>
                            </RouterLink>
                        </>
                    ) : (<></>)}
                </div>
                <div>
                    {user ? (
                        <>
                            {user}
                            <Button onClick={onLogout}>
                                Log Out
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={onLogin}>
                                Log In
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
