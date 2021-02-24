import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {App} from './App';
import reportWebVitals from './reportWebVitals';
import {MsalProvider} from "@azure/msal-react";
import {msalInstance} from "./infrastructure/auth/b2cAuth";
import {UserContextProvider} from "./infrastructure/context";

ReactDOM.render(
  <React.StrictMode>
    <MsalProvider instance={msalInstance}>
      <UserContextProvider>
    <App/>
      </UserContextProvider>
    </MsalProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


