import React, { Component } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
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
      profile: {},
      navOpen: false,
      location: ""
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  componentDidMount() {
    this.props.history.listen(location => {
      this.setState({
        location: location.pathname
      });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.profile) {
      this.setState({ profile: nextProps.profile });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { location } = this.state;
    if (location !== prevState.location) {
      this.setState({
        navOpen: false
      });
    }
  }

  toggleNav() {
    if (!this.state.navOpen) {
      this.setState({
        navOpen: true
      });
    } else {
      this.setState({
        navOpen: false
      });
    }
  }
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentProfile();
    this.props.logoutUser(this.props.history);
  }
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { navOpen } = this.state;

    const authLinks = (
      <div>
        <div className="ck-header__user">
          <div className="ck-header__logout">
            <div className="ck-header__dropdown">
              <a className="ck-header__dropbtn">
                <img src={`/uploads/${user.avatar}`} alt={user.name} />
              </a>

              <div
                className={
                  "ck-header__dropdown-content " +
                  (!navOpen ? "hidden" : "visible")
                }
              >
                <ul>
                  <li>
                    <NavLink activeClassName="selected" to="/user/settings">
                      {user.name}
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/create-tutorial">
                      Create a tutorial
                    </NavLink>
                  </li>
                  <li>
                    <NavLink activeClassName="selected" to="/favorites">
                      Favorites
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="" onClick={this.onLogoutClick.bind(this)}>
                      Log out
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={"ck-sidenav " + (!navOpen ? null : "visible")}>
          <div className="ck-sidenav__profile-user">
            <NavLink
              className="welcome_user"
              activeClassName="selected"
              to="/user/settings"
            >
              <img src={`/uploads/${user.avatar}`} alt="" />
              <p>Welcome, {user.name}</p>
            </NavLink>
          </div>
          <ul>
            <li className={"ck-subnav__links"}>
              <NavLink to="/user/avatar">Change your avatar</NavLink>
            </li>
            <li className={"ck-subnav__links "}>
              <NavLink to="/user/profile">Profile settings</NavLink>
            </li>
            <li className={"ck-subnav__links"}>
              <NavLink to="/user/posts">My posts</NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/create-tutorial">
                Create a tutorial
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="selected" to="/favorites">
                Favorites
              </NavLink>
            </li>
            <li>
              <NavLink to="" onClick={this.onLogoutClick.bind(this)}>
                Log out
              </NavLink>
            </li>
          </ul>
        </div>
        <div
          className={
            "ck-sidenav__overlay " + (!navOpen ? null : "ck-overlay__show")
          }
          onClick={this.toggleNav}
        />
      </div>
    );

    const guestLinks = (
      <div>
        <div className="ck-header__user">
          <div className="ck-header__login">
            <Link to="/login">Log In</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        <div className={"ck-sidenav " + (!navOpen ? null : "visible")}>
          <div className="ck-sidenav__profile-user guest">
            <p>Welcome, stranger!</p>
          </div>
          <div className="ck-guest__actions">
            <Link to="/login">Log in</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
        <div
          className={
            "ck-sidenav__overlay " + (!navOpen ? null : "ck-overlay__show")
          }
          onClick={this.toggleNav}
        />
      </div>
    );
    return (
      <header>
        <div className="ck-header">
          <div className="ck-hamburger">
            <i onClick={this.toggleNav} className="fas fa-bars" />
          </div>
          <div className="ck-header__logo">
            <Link to="/">
              <img
                src="/logo/codekings_logo_wit.svg"
                className="ck-logo-image-sm"
                alt=""
              />
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
})(withRouter(Navbar));
