import React, {FC, useEffect} from 'react';
import {
  Router,
  Switch,
  Route,
} from "react-router";
import {Header} from './components/Header/Header';
import {createBrowserHistory} from "history";
import {UserContextProvider} from './context/userContext';
import {HomePage} from "./pages/HomePage";
import {MatrixPage} from "./pages/MatrixPage";
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import queryClient from "./queries/queryClient";
import {lightTheme} from "./themes/theme";
import {ThemeProvider} from "styled-components";
import {PersonListPage} from "./pages/PersonListPage";
import {SkillListPage} from "./pages/SkillListPage";
import {ExperienceListPage} from "./pages/ExperienceListPage";
import {PersonPage} from "./pages/PersonPage";
import {SkillPage} from "./pages/SkillPage";
import {ExperiencePage} from "./pages/ExperiencePage";

const history = createBrowserHistory();

export const App: FC = () => {
  const [theme, setTheme] = React.useState(lightTheme);
  useEffect(() => setTheme(lightTheme), []);

  return (
    <UserContextProvider>
      {theme && (
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Router history={history}>
              <Header/>
              <Switch>
                <Route exact path="/">
                  <HomePage/>
                </Route>
                <Route exact path="/matrix">
                  <MatrixPage/>
                </Route>
                <Route exact path="/person">
                  <PersonListPage/>
                </Route>
                <Route path="/person/:id">
                  <PersonPage/>
                </Route>
                <Route exact path="/skill">
                  <SkillListPage/>
                </Route>
                <Route path="/skill/:id">
                  <SkillPage/>
                </Route>
                <Route exact path="/experience">
                  <ExperienceListPage/>
                </Route>
                <Route path="/experience/:id">
                  <ExperiencePage/>
                </Route>
              </Switch>
            </Router>
            <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
        </ThemeProvider>
      )}
    </UserContextProvider>
  );
}
