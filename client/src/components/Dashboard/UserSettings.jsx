import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import InputGroup from "../common/InputGroup";
import { changePassword } from "../../actions/authActions";
import { deleteAccount } from "../../actions/profileActions";
import { deleteAllFavorites } from "../../actions/favoriteActions";
import Subnav from "../Navbar/SubNav";
import Modal from "@material-ui/core/Modal";

class UserSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      avatarFile: "",
      email: "",
      oldPassword: "",
      newPassword: "",
      newPassword2: "",
      errors: {},
      open: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.delete = this.delete.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.auth;
    console.log(user);
    this.setState({
      email: user.email,
      avatar: user.avatar
    });
  }

  onChange(e) {
    const state = this.state;
    switch (e.target.name) {
      case "postHeader":
        {
          if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = event => {
              this.setState({
                avatar: event.target.result
              });
            };
            reader.readAsDataURL(e.target.files[0]);
          }
          state.avatarFile = e.target.files[0];
        }
        break;
      default:
        state[e.target.name] = e.target.value;
    }
    this.setState(state);
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

  openModal() {
    this.setState({
      open: true
    });
  }

  closeModal() {
    this.setState({
      open: false
    });
  }

  delete() {
    this.props.deleteAllFavorites();
    this.props.deleteAccount(this.props.history);
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-dashboard">
            <div className="edit-profile__container">
              <div className="edit-profile__header edit-profile__top-header">
                <h1>User settings</h1>
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
            <div className="ck-delete__account">
              <button onClick={this.openModal}>Delete account</button>
            </div>
            <Modal
              open={this.state.open}
              onClose={this.closeModal}
              onBackdropClick={this.closeModal}
            >
              <div className="ck-modal">
                <div className="ck-modal__wrapper">
                  <p>
                    We are sad to see you go! <br /> Are you sure you want to
                    delete your account?
                  </p>
                  <button onClick={this.delete} className="ck-delete__btn">
                    Confirm
                  </button>
                  <button onClick={this.closeModal}>Cancel</button>
                </div>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

UserSettings.PropTypes = {
  changePassword: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  deleteAllFavorites: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, {
  changePassword,
  deleteAccount,
  deleteAllFavorites
})(withRouter(UserSettings));
