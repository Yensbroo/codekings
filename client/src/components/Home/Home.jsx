import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isAuthenticated } = this.props.auth;

    const authHome = <div className="container">User Logged In</div>;

    const guestHome = <div className="container">Welcome guest</div>;
    return <div>{isAuthenticated ? authHome : guestHome}</div>;
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Home);
