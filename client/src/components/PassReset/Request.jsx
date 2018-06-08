import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { sendRequest } from "../../actions/passResetActions";
import TextFieldGroup from "../common/TextFieldGroup";

class ResetRequest extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
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

    const newRequest = {
      email: this.state.email
    };
    this.props.sendRequest(newRequest, this.props.history);
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
              placeholder="Email"
              name="email"
              type="text"
              value={this.state.email}
              onChange={this.onChange}
              error={errors.email}
            />
            <button>Send email</button>
          </form>
        </div>
      </div>
    );
  }
}

ResetRequest.PropTypes = {
  sendRequest: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { sendRequest }
)(withRouter(ResetRequest));
