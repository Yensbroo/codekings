import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import {
  clearCurrentProfile,
  getCurrentProfile
} from "../../actions/profileActions";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      profile: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.setState({ profile: nextProps.profile });
    }
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser();
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;

    const authLinks = (
      <div className="ck-header__user">
        <div className="ck-header__logout">
          <a className="ck-header__dropbtn">
            <img src={user.avatar} alt={user.name} />
          </a>
          <div className="ck-header__dropdown-content">
            <ul>
              <li>
                <Link to="/dashboard">{user.name}</Link>
              </li>
              <li>
                <Link to="" onClick={this.onLogoutClick.bind(this)}>
                  Log out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );

    const guestLinks = (
      <div className="ck-header__user">
        <div className="ck-header__login">
          <Link to="/login">Log In</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </div>
    );
    return (
      <header>
        <div className="ck-header">
          <div className="ck-header__logo">
            <Link to="/">
              <h2>Codekings</h2>
            </Link>
          </div>
          <div className="ck-header__search">
            <input
              type="text"
              className="ck-search__input"
              placeholder="Search for tutorials"
            />
            <button type="button" className="ck-search__button">
              <i className="material-icons ck-search__icon">search</i>
            </button>
          </div>
          {isAuthenticated ? authLinks : guestLinks}
        </div>
      </header>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, {
  logoutUser,
  clearCurrentProfile,
  getCurrentProfile
})(Navbar);
