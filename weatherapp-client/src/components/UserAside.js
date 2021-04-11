import React from "react";

const UserAside = ({ username }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">{username}</div>
    </div>
  </aside>
);

export default UserAside;
