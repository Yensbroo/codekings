import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../common/Loader";
import { getProfiles } from "../../actions/profileActions";

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }
  render() {
    const { profiles, loading } = this.props.profile;
    let profileItems;
    if (profiles === null || loading) {
      profileItems = <Loader />;
    } else {
      if (profiles.length > 0) {
        <h1>Profiles here</h1>;
      } else {
        profileItems = <h4>No Profiles found</h4>;
      }
    }
    return <div className="ck-profiles" />;
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(null, { getProfiles })(Profiles);
