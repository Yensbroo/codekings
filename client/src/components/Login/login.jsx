import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser, fbLoginUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
import FacebookLogin from "react-facebook-login";
import TextFieldGroup from "../common/TextFieldGroup";
import config from "../../config";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  facebookResponse = response => {
    this.props.fbLoginUser(response.accessToken);
  };
  render() {
    const { errors } = this.state;
    return (
      <div className="ck-user-form__container">
        <div className="ck-user-form__wrapper">
          <div className="ck-user-form__logo">
            <Link to="/" className="ck-logo">
              CodeKings
            </Link>
          </div>
          <hr />
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="Email"
              name="email"
              type="email"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <TextFieldGroup
              placeholder="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.onChange}
              error={errors.password}
            />
            <button>Log In</button>
            <FacebookLogin
              appId={config.fbAppId}
              autoLoad={false}
              fields="name, email, picture"
              callback={this.facebookResponse}
            />
          </form>
          <span>
            Don't have an account yet?{" "}
            <Link to="/signup" className="login-redirect">
              Sign Up
            </Link>
          </span>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  fbLoginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser, fbLoginUser })(Login);
