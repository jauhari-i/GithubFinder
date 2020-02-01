import React from "react";
import PropTypes from "prop-types";
import RepoItem from "./RepoItem";

const Repo = ({ repos }) => {
  return repos.map(repo => <RepoItem repo={repo} key={repo.id} />);
};

Repo.propTpes = {
  repos: PropTypes.array.isRequired
};

export default Repo;
