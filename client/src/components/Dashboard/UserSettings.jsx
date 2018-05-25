import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import InputGroup from "../common/InputGroup";
import {} from "../../actions/profileActions";
import {} from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";
import Subnav from "../Navbar/SubNav";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({
      email: user.email
    });
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.auth) {
      const user = nextProps.auth;
      user.email = !isEmpty(user.email) ? user.email : "";

      this.setState({
        email: user.email
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
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

    this.props.UserSettings(profileData, this.props.history);
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    console.log(user);

    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-dashboard">
            <div className="edit-profile__container">
              <div className="edit-profile__header edit-profile__top-header">
                <h1>Create profile</h1>
                <p>Add some information about yourself.</p>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="edit-profile__wrapper">
                  <div className="edit-profile__form">
                    <TextFieldGroup
                      label="Email"
                      placeholder="Email"
                      name="Email"
                      value={this.state.email}
                      onChange={this.onChange}
                      error={errors.Email}
                      disabled="disabled"
                    />
                    <TextFieldGroup
                      label="old password"
                      placeholder="Old password"
                      name="oldPassword"
                      value={this.state.oldPassword}
                      onChange={this.onChange}
                      error={errors.oldPassword}
                    />
                    <TextFieldGroup
                      label="new password"
                      placeholder="New password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={this.onChange}
                      error={errors.newPassword}
                    />
                    <TextFieldGroup
                      label="repeat new password"
                      placeholder="Repeat new password"
                      name="newPassword2"
                      value={this.state.newPassword2}
                      onChange={this.onChange}
                      error={errors.newPassword2}
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

UserSettings.PropTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { UserSettings })(
  withRouter(UserSettings)
);
