import React, { Fragment, useState } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import Search from "./components/users/Search";
import Single from "./components/users/Single";
import { Alert } from "./components/layouts/Alert";
import { About } from "./components/pages/About";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alerts, setAlerts] = useState(null);
  const [repos, setRepos] = useState([]);

  const searchUser = async text => {
    setLoading(true);
    const res = await Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const clearUser = () => setUsers([]);

  const setAlert = (msg, type) => {
    setAlerts({ msg, type });
    setTimeout(() => setAlerts(null), 2000);
  };

  const getUser = async username => {
    setLoading(true);

    const res = await Axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };

  const getUserRepos = async username => {
    setLoading(true);

    const res = await Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    setRepos(res.data);
    setLoading(false);
  };

  return (
    <Router>
      <Navbar title="Github Finder" icon="fab fa-github" />
      <div className="container">
        <Alert alert={alerts} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Fragment>
                <Search
                  searchUser={searchUser}
                  clearUser={clearUser}
                  showClear={users.length > 0 ? true : false}
                  setAlert={setAlert}
                />
                <User loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={props => (
              <Single
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
