import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import InputGroup from "../common/InputGroup";
import { changePassword } from "../../actions/authActions";
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
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const userData = {
      oldPassword: this.state.oldPassword,
      newPassword: this.state.newPassword,
      newPassword2: this.state.newPassword2
    };

    this.props.changePassword(userData);
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;

    console.log(this.state);

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
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                      disabled="disabled"
                    />
                    <TextFieldGroup
                      type="password"
                      label="old password"
                      placeholder="Old password"
                      name="oldPassword"
                      value={this.state.oldPassword}
                      onChange={this.onChange}
                      error={errors.oldPassword}
                    />
                    <TextFieldGroup
                      type="password"
                      label="new password"
                      placeholder="New password"
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={this.onChange}
                      error={errors.newPassword}
                    />
                    <TextFieldGroup
                      type="password"
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
  changePassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { changePassword })(UserSettings);
