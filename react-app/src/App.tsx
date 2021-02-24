import React, {FC, useContext, useEffect} from 'react';
import {
  Router,
  Switch,
  Route,
  RouteProps,
  useHistory
} from "react-router";
import {createBrowserHistory} from "history";
import {UserContext, UserContextModel, UserContextProvider} from 'infrastructure/context';
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import queryClient from "queries/queryClient";
import {lightTheme} from "./themes";
import {ThemeProvider} from "styled-components";
import {Header, LoadingTableProps} from "./components";
import {
  ExperienceListPage,
  ExperiencePage,
  HomePage,
  MatrixPage,
  PersonListPage,
  PersonPage,
  SkillListPage,
  SkillPage
} from "./pages";
import {Redirect} from 'react-router-dom';
import {useMsal} from "@azure/msal-react";
import {TokenClaims} from "./infrastructure/auth/b2cAuth";
import {PrivateRoute} from "./infrastructure/auth/PrivateRoute";
import {ProfilePage} from "./pages/person/ProfilePage";

const browserHistory = createBrowserHistory();

export const App: FC = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const {setUser, user} = useContext<UserContextModel>(UserContext);
  const {instance: msalInstance} = useMsal();

  useEffect(() => setTheme(lightTheme), []);

  // Log in with locally cached token
  useEffect(() => {
    const accounts = msalInstance.getAllAccounts();
    const account = accounts[0];
    if (setUser && account) {
      const tokenClaims: TokenClaims = account.idTokenClaims as TokenClaims;

      if (setUser) {
        setUser({
          id: tokenClaims.oid,
          username: tokenClaims.name,
          email: tokenClaims.preferred_username
        });
      }
    }
  }, [setUser]);

  // Log in with new response token
  const handleLogin = async () => {
    const authResult = await msalInstance.loginPopup({scopes: []});

    if (setUser && authResult && authResult.account && authResult.account.idTokenClaims) {
      const tokenClaims: TokenClaims = authResult.account.idTokenClaims as TokenClaims;

      setUser({
        id: tokenClaims.oid,
        username: tokenClaims.name,
        email: tokenClaims.preferred_username
      });
    }
  }

  const handleLogout = async () => {
    const authResult = await msalInstance.logout({});
  };

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Router history={browserHistory}>
          <Header user={user} onLogin={handleLogin} onLogout={handleLogout}/>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <PrivateRoute exact path="/matrix">
              <MatrixPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/person">
              <PersonListPage/>
            </PrivateRoute>
            <PrivateRoute path="/person/:id">
              <PersonPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/skill">
              <SkillListPage/>
            </PrivateRoute>
            <PrivateRoute path="/skill/:id">
              <SkillPage/>
            </PrivateRoute>
            <PrivateRoute exact path="/experience">
              <ExperienceListPage/>
            </PrivateRoute>
            <PrivateRoute path="/experience/:id">
              <ExperiencePage/>
            </PrivateRoute>
            <PrivateRoute exact path="/profile">
              <ProfilePage/>
            </PrivateRoute>
          </Switch>
        </Router>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
