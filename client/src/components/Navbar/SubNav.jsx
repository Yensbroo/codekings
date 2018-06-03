import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Subnav extends Component {
  render() {
    const { user } = this.props.auth;
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
              <NavLink activeClassName="selected" to="/user/avatar">
                Change your avatar
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to={`/profile/${user.id}`}>
                View profile
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
  }
}

Subnav.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Subnav);
