import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profileActions";
import { getPosts } from "../../actions/postActions";
import Loader from "../common/Loader";
import CreateProfile from "./CreateProfile";
import EditProfile from "./EditProfile";
import PostCard from "./PostCard";
import Subnav from "../Navbar/SubNav";

class UserPosts extends Component {
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
        </div>
      );
    }

    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-dashboard__welcome">{dashboardContent}</div>
          <PostCard posts={posts} />
        </div>
      </div>
    );
  }
}

UserPosts.propTypes = {
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
  UserPosts
);
