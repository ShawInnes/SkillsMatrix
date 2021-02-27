import React, {FC, useContext, useEffect} from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router";
import {createBrowserHistory} from "history";
import {UserContext, UserContextModel} from 'infrastructure/context';
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import queryClient from "queries/queryClient";
import {lightTheme} from "./themes";
import {ThemeProvider} from "styled-components";
import {Header} from "./components";
import {
  ExperienceListPage,
  ExperiencePage,
  HomePage,
  MatrixPage,
  PersonListPage,
  PersonPage,
  SkillListPage,
  SkillViewPage
} from "./pages";
import {PrivateRoute} from "./infrastructure/auth/PrivateRoute";
import {ProfilePage} from "./pages/person/ProfilePage";
import authService from "./infrastructure/auth/AuthService";
import {SkillEditPage} from "./pages/skill/SkillEditPage";

const browserHistory = createBrowserHistory();

export const App: FC = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  const {setUser, user} = useContext<UserContextModel>(UserContext);

  useEffect(() => setTheme(lightTheme), []);

  // Log in with locally cached token
  useEffect(() => {
    (async function getIdentity() {
      const identity = await authService.getIdentity();
      const profile = await authService.getProfile();

      if (setUser) {
        setUser({
          id: identity.oid,
          name: identity.name,
          email: identity.email
        });
      }

    })();
  }, [setUser]);

  // Log in with new response token
  const handleLogin = async () => {
    const identity = await authService.signIn();
    const profile = await authService.getProfile();

    if (setUser) {
      setUser({
        id: identity.oid,
        name: identity.name,
        email: identity.email
      });
    }
  }

  const handleLogout = async () => {
    await authService.signOut();
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
            <PrivateRoute exact path="/skill/edit">
              <SkillEditPage/>
            </PrivateRoute>
            <PrivateRoute path="/skill/edit/:id">
              <SkillEditPage/>
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
