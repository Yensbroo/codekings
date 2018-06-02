import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
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

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(newUser, this.props.history);
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
              placeholder="Full name"
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.onChange}
              error={errors.name}
            />
            <TextFieldGroup
              placeholder="Email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
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
            <button>Sign Up</button>
          </form>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="login-redirect">
              Log In
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

SignUp.PropTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { registerUser })(withRouter(SignUp));
