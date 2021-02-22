import React, {FC, useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {HomePage} from './pages/HomePage';
import {AboutPage} from './pages/AboutPage';
import {MatrixPage} from './pages/MatrixPage';
import {Header} from './components/Header/Header';

import {UserContextProvider} from './context/userContext';

export const App: FC = () => {
  return (
    <UserContextProvider>
      <Router>
        <Header />
        <Switch>
          <Route path="/about">
            <AboutPage/>
          </Route>
          <Route path="/users">
            <MatrixPage/>
          </Route>
          <Route path="/">
            <HomePage/>
          </Route>
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

