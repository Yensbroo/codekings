import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/passResetActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Reset extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

    const newPassword = {
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.resetPassword(
      this.props.match.params.token,
      newPassword,
      this.props.history
    );
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="ck-user-form__container">
        <div className="ck-user-form__wrapper">
          <div className="ck-user-form__logo">
            <Link to="/" className="ck-logo">
              <img
                src="/logo/codekings_logo_zwart.svg"
                className="ck-logo-image"
                alt=""
              />
            </Link>
          </div>
          <hr />
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <TextFieldGroup
              placeholder="Confirm password"
              name="password2"
              type="password"
              value={this.state.password2}
              onChange={this.onChange}
              error={errors.password2}
            />
            <button>Reset Password</button>
          </form>
        </div>
      </div>
    );
  }
}

Reset.PropTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(Reset));
