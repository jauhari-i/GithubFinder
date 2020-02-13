import React, { useReducer } from "react";
import axios from "axios";
import githubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
  SEARCH_USERS,
  SET_LOADING,
  GET_REPOS,
  GET_USER,
  CLEAR_USER
} from "../types";

let gitId;
let gitSecret;

if (process.env.NODE_ENV !== "production") {
  gitId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  gitSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  gitId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  gitSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search
  const searchUser = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${gitId}&client_secret=${gitSecret}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  // Get User
  const getUser = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${gitId}&client_secret=${gitSecret}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };
  // Get Repos
  const getUserRepos = async username => {
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${gitId}&client_secret=${gitSecret}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };
  // Clear
  const clearUser = () => dispatch({ type: CLEAR_USER });

  // loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <githubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUser,
        clearUser,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </githubContext.Provider>
  );
};

export default GithubState;
