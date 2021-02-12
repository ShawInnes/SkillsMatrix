import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Users } from './pages/Users';
import { Header } from './components/Header';

import './App.css';

const onLogin = () => { console.log('onLogin') }
const onLogout = () => { console.log('onLogout') }
const onCreateAccount = () => { console.log('onCreateAccount') }

export interface AppProps {
  user?: {};
}

export const App: React.FC<AppProps> = ({user}) => {
  return (
    <Router>
      <Header user={user} onLogin={onLogin} onLogout={onLogout} onCreateAccount={onCreateAccount} />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

