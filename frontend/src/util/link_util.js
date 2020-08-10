import React from "react";
import { Route, Link } from "react-router-dom";

export default ({ label, to }) => (
  <Route
    path={to}
    children={({ match }) => (
      <div className="href-text">
        {match ? "" : <Link to={to}>{label}</Link>}
      </div>
    )}
  />
);
