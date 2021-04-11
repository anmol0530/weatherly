import React from "react";
import SearchList from "../containers/SearchList";
import UserAside from "./UserAside";

const SearchTimeline = (props) => {
  return (
    <div className="timeline">
      <UserAside username={props.username} />
      <h1>Previous Searches</h1>
      <hr />
      <SearchList />
    </div>
  );
};

export default SearchTimeline;
