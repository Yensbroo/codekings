import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileGithub from "./ProfileGithub";
import ProfileBio from "./ProfileBio";
import Loader from "../common/Loader";
import { getProfileById } from "../../actions/profileActions";
import { getProfilePosts } from "../../actions/postActions";
import ProfileAbout from "./ProfileBio";
import ProfilePosts from "./ProfilePosts";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      isProfile: false
    };
  }
  componentDidMount() {
    this.props.getProfileById(this.props.match.params.id);
    this.props.getProfilePosts(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      if (nextProps.profile.profile !== null) {
        this.setState({
          isProfile: true
        });
      }
    }
  }

  componentDidUpdate() {
    if (this.props.profile.profile === null && !this.props.profile.loading) {
      this.props.history.push("/not-found");
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    const { posts } = this.props.post;
    let profileContent;
    if (profile === null || loading) {
      profileContent = <Loader />;
    } else {
      profileContent = (
        <div>
          <ProfileHeader profile={profile} />
          <div className="container">
            <ProfileAbout profile={profile} />
            <ProfilePosts posts={posts} name={profile.user.name} />
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
  getProfileById: PropTypes.func.isRequired,
  getProfilePosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  post: state.post
});

export default connect(mapStateToProps, { getProfileById, getProfilePosts })(
  Profile
);
