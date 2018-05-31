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
        <div>
          <ProfileHeader profile={profile} />
          <div className="container">
            <ProfileAbout profile={profile} />
            {profile.githubUsername ? (
              <div className="ck-github__container">
                <ProfileGithub username={profile.githubUsername} />
              </div>
            ) : null}
          </div>
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
