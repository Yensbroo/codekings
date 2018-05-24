import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class DashboardLinks extends Component {
  render(props) {
    const { user } = this.props.auth;
    return (
      <div className="ck-dashboard__links">
        <div className="ck-dashboard__links-header">
          <img src={this.props.avatar} alt={this.props.name} />
          <h3>{user.name}</h3>
        </div>
        <ul>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/dashboard/edit-profile">Edit profile</Link>
          </li>
          <li>
            <Link to="#">Profile</Link>
          </li>
          <li>
            <Link to="#">Profile</Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DashboardLinks);
