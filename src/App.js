import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter
} from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Single from "./components/users/Single";
import { Alert } from "./components/layouts/Alert";
import { About } from "./components/pages/About";
import "./App.css";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";
import Home from "./components/pages/Home";
import notFound from "./components/pages/notFound";

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <HashRouter basename={process.env.PUBLIC_URL}>
          <Router>
            <Navbar title="Github Finder" icon="fab fa-github" />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route
                  exact
                  path="/user/:login"
                  render={props => <Single {...props} />}
                />
                <Route exact component={notFound} />
              </Switch>
            </div>
          </Router>
        </HashRouter>
      </AlertState>
    </GithubState>
  );
};

export default App;
