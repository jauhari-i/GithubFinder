import React, { Fragment, useEffect, useContext } from "react";
import Spinner from "../layouts/Spinner";
import { Link } from "react-router-dom";
import Repo from "../repo/Repo";
import GithubContext from "../../context/github/githubContext";

const Single = ({ match }) => {
  const context = useContext(GithubContext);
  const { getUser, loading, user, getUserRepos, repos } = context;
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    html_url,
    location,
    bio,
    blog,
    login,
    followers,
    following,
    public_repos,
    public_gists,
    company,
    hireable
  } = user;

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back to search
        </Link>
        Hireable: {""}
        {hireable ? (
          <i className="fas fa-check text-success" />
        ) : (
          <i className="fas fa-times-circle text-danger" />
        )}
        <div className="card grid-2">
          <div className="all-center">
            <img
              src={avatar_url}
              alt="pp"
              className="round-img"
              style={{ width: "150px" }}
            />
            <h1>{name}</h1>
            <p>Location: {location}</p>
          </div>
          <div>
            {bio && (
              <Fragment>
                <h3>Bio</h3>
                <p>{bio}</p>
              </Fragment>
            )}
            <a href={html_url} className="btn btn-dark my-1">
              {" "}
              Visit github profile
            </a>
            <ul>
              <li>
                {login && (
                  <Fragment>
                    <strong>Username: </strong>
                    {login}
                  </Fragment>
                )}
              </li>
              <li>
                {blog && (
                  <Fragment>
                    <strong>Site: </strong>
                    {blog}
                  </Fragment>
                )}
              </li>
              <li>
                {company && (
                  <Fragment>
                    <strong>Company: </strong>
                    {company}
                  </Fragment>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className="card text-center">
          <div className="badge badge-primary">Followers: {followers}</div>
          <div className="badge badge-success">Following: {following}</div>
          <div className="badge badge-light">Repository: {public_repos}</div>
          <div className="badge badge-dark">Gists: {public_gists}</div>
        </div>
        <Repo repos={repos} />
      </Fragment>
    );
  }
};

export default Single;
