import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";
import { getCurrentProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import Subnav from "../Navbar/SubNav";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      website: "",
      location: "",
      skills: "",
      githubUsername: "",
      twitter: "",
      facebook: "",
      linkedin: "",
      youtube: "",
      instagram: "",
      bio: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(",");
      profile.website = !isEmpty(profile.website) ? profile.website : "";
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.githubUsername = !isEmpty(profile.githubUsername)
        ? profile.githubUsername
        : "";
      profile.bio = !isEmpty(profile.bio) ? profile.bio : "";
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : "";
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : "";
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : "";

      this.setState({
        website: profile.website,
        location: profile.location,
        skills: skillsCSV,
        githubUsername: profile.githubUsername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube,
        instagram: profile.instagram
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      avatar: this.state.avatar,
      website: this.state.website,
      location: this.state.location,
      skills: this.state.skills,
      githubUsername: this.state.githubUsername,
      bio: this.state.bio,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram
    };

    this.props.createProfile(profileData, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-dashboard">
            <div className="edit-profile__container">
              <div className="edit-profile__header edit-profile__top-header">
                <h1>Edit profile</h1>
                <p>Add some information about yourself.</p>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="edit-profile__wrapper">
                  <div className="edit-profile__form">
                    <TextFieldGroup
                      label="Website"
                      placeholder="Website"
                      name="website"
                      value={this.state.website}
                      error={errors.website}
                      onChange={this.onChange}
                    />
                    <TextFieldGroup
                      label="Location"
                      placeholder="Location"
                      name="location"
                      value={this.state.location}
                      onChange={this.onChange}
                    />
                    <TextFieldGroup
                      label="Skills*"
                      placeholder="Skills"
                      name="skills"
                      value={this.state.skills}
                      onChange={this.onChange}
                      error={errors.skills}
                      info="Please use comma seperated values (eg. HTML, CSS, Javascript)"
                    />
                    <TextFieldGroup
                      label="Github username"
                      placeholder="Github username"
                      name="githubUsername"
                      value={this.state.githubUsername}
                      onChange={this.onChange}
                      info="Include your username, this is necessary if you want to show your latest github repos"
                    />
                    <TextAreaGroup
                      label="Bio"
                      name="bio"
                      placeholder="Tell something about yourself!"
                      value={this.state.bio}
                      onChange={this.onChange}
                    />
                  </div>
                </div>
                <hr />
                <div className="edit-profile__header">
                  <h1>Social media links</h1>
                </div>
                <div className="edit-profile__wrapper">
                  <div className="edit-profile__form">
                    <InputGroup
                      placeholder="Facebook Profile URL"
                      name="facebook"
                      icon="fab fa-facebook-square"
                      value={this.state.facebook}
                      onChange={this.onChange}
                      error={errors.facebook}
                    />
                    <InputGroup
                      placeholder="Twitter Profile URL"
                      name="twitter"
                      icon="fab fa-twitter-square"
                      value={this.state.twitter}
                      onChange={this.onChange}
                      error={errors.twitter}
                    />
                    <InputGroup
                      placeholder="LinkedIn Profile URL"
                      name="linkedin"
                      icon="fab fa-linkedin"
                      value={this.state.linkedin}
                      onChange={this.onChange}
                      error={errors.linkedin}
                    />
                    <InputGroup
                      placeholder="Instagram Profile URL"
                      name="instagram"
                      icon="fab fa-instagram"
                      value={this.state.instagram}
                      onChange={this.onChange}
                      error={errors.instagram}
                    />
                    <InputGroup
                      placeholder="Youtube Profile URL"
                      name="youtube"
                      icon="fab fa-youtube-square"
                      value={this.state.youtube}
                      onChange={this.onChange}
                      error={errors.youtube}
                    />
                  </div>
                </div>
                <hr />
                <div className="edit-profile__wrapper">
                  <div className="edit-profile__submit">
                    <button>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.PropTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
