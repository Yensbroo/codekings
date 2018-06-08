import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { denyReset } from "../../actions/passResetActions";

class ResetRequest extends Component {
  componentDidMount() {
    this.props.denyReset(this.props.match.params.token, this.props.history);
  }

  render() {
    return <div />;
  }
}

ResetRequest.PropTypes = {
  denyReset: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { denyReset }
)(withRouter(ResetRequest));
