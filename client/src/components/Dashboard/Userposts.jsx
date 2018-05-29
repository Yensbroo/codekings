import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions/postActions";
import PostCard from "./PostCard";
import Subnav from "../Navbar/SubNav";

class UserPosts extends Component {
  componentDidMount() {
    this.props.getUserPosts();
  }
  render() {
    const { posts } = this.props.post;
    // console.log(posts);
    let dashboardContent;
    if (posts === null) {
      dashboardContent = <h1>No posts</h1>;
    } else {
      dashboardContent = <PostCard posts={posts} />;
    }

    return (
      <div className="ck-content">
        <Subnav />
        <div>{dashboardContent}</div>
      </div>
    );
  }
}

UserPosts.propTypes = {
  getUserPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getUserPosts })(UserPosts);
