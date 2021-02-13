import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Home} from './pages/Home';
import {About} from './pages/About';
import {Users} from './pages/Users';
import {Header} from './components/Header/Header';

import './App.scss';

import {msalConfig, loginRequest} from "./auth/authConfig";
import {MsalProvider} from "@azure/msal-react";
import {PublicClientApplication} from "@azure/msal-browser";


export interface AppProps {
    user?: string;
}

export const App: React.FC<AppProps> = ({user}) => {
    const msalInstance = new PublicClientApplication(msalConfig);

    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        user = accounts[0].username
    }

    const Login = () => {
        msalInstance.loginPopup(loginRequest).then(p => {
            user = p.account?.username;
        });
    }

    const Logout = () => {
        msalInstance.logout().then(p => console.log('onLogout', p));
    }

    return (
        <MsalProvider instance={msalInstance}>
            <Router>
                <Header user={user} onLogin={Login} onLogout={Logout}/>
                <Switch>
                    <Route path="/about">
                        <About/>
                    </Route>
                    <Route path="/users">
                        <Users/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </Router>
        </MsalProvider>
    );
}

