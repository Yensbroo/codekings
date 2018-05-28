import React from "react";
import { NavLink } from "react-router-dom";

const Subnav = () => {
  return (
    <div className="ck-subnav">
      <div className="container">
        <ul>
          <li>
            <NavLink activeClassName="selected" to="/user/settings">
              User settings
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/user/profile">
              Profile settings
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="selected" to="/user/posts">
              My posts
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Subnav;
