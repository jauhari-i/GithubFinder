import React, { Fragment } from "react";
import User from "../users/User";
import Search from "../users/Search";

const Home = () => {
  return (
    <Fragment>
      <Search />
      <User />
    </Fragment>
  );
};

export default Home;
