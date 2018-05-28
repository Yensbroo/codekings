import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileGithub from "./ProfileGithub";
import ProfileBio from "./ProfileBio";
import Loader from "../common/Loader";
import { getProfileById } from "../../actions/profileActions";
import ProfileAbout from "./ProfileBio";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfileById(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }
  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
      profileContent = <Loader />;
    } else {
      profileContent = (
        <div className="container">
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile} />
          {profile.githubUsername ? (
            <ProfileGithub username={profile.githubUsername} />
          ) : null}
        </div>
      );
    }
    return <div className="ck-profile__container">{profileContent}</div>;
  }
}

Profile.propTypes = {
  profile: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfileById })(Profile);
