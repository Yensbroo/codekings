import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getPosts } from "../../actions/postActions";
import Loader from "../common/Loader";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import PostsList from "./PostsList";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
    this.props.getPosts();
  }
  render() {
    const { user, auth } = this.props.auth;
    const { loading } = this.props.post;
    const { profile } = this.props.profile;
    const { posts } = this.props.post;
    let dashboardContent;

    if (profile === null) {
      dashboardContent = (
        <div>
          <h1>
            Welcome <Link to={`/profile/${user._id}`}>{user.name}</Link>
          </h1>
          <div className="no-profile">
            <p>It looks like you have not created a profile yet</p>
            <Link to="/dashboard/create-profile">Create one now</Link>
          </div>
          <PostsList posts={posts} />
        </div>
      );
    } else if (!loading) {
      dashboardContent = (
        <div>
          <h1>Welcome {user.name}</h1>
          <div className="ck-dashboard__posts-table">
            <PostsList posts={posts} />
          </div>
        </div>
      );
    }
    return (
      <div className="container">
        <div className="ck-dashboard">
          <div className="ck-dashboard__welcome">{dashboardContent}</div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getCurrentProfile, getPosts })(
  Dashboard
);
