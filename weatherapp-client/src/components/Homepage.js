import React from "react";
import { Link } from "react-router-dom";
// import SearchTimeline from "./SearchTimeline";
import SearchForm from "../containers/SearchForm";

const Homepage = ({ currentUser }) => {
  if (!currentUser.isAuthenticated) {
    return (
      <div className="home-hero">
        <h1 className="display-1">Welcome to Weatherly</h1>
        <h2>Sign up to get accurate weather updates!</h2>
        <Link to="/signup" className="btn btn-primary signup-homepage-btn">
          Sign up Here
        </Link>
      </div>
    );
  }
  return (
    <div className="home-timeline">
      <SearchForm username={currentUser.user.username} />
    </div>
  );
};

export default Homepage;
