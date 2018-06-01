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
            <img src={`/uploads/${user.avatar}`} alt={user.name} />
          </a>
          <div className="ck-header__dropdown-content">
            <ul>
              <li>
                <Link to="/user/settings">{user.name}</Link>
              </li>
              <li>
                <Link to="/favorites">Favorites</Link>
              </li>
              <li>
                <Link
                  to=""
                  onClick={this.onLogoutClick.bind(this)}
                  className="logout"
                >
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
              <img
                src="/logo/codekings_logo_wit.svg"
                className="ck-logo-image-sm"
                alt=""
              />
            </Link>
            <Link to="/create-tutorial" className="ck-tutorial">
              Create a tutorial
            </Link>
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
