import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";

class ProfileSettings extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }
  render() {
    const { profile } = this.props.profile;

    let profileSettings;

    if (profile === null) {
      profileSettings = <CreateProfile />;
    } else {
      profileSettings = <EditProfile />;
    }
    return <div>{profileSettings}</div>;
  }
}

ProfileSettings.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(ProfileSettings);
