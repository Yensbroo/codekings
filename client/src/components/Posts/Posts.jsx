import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loading from "../common/Loader";
import { getPosts } from "../../actions/postActions";
import PostFeed from "./PostFeed";
import Loader from "../common/Loader";

class Posts extends Component {
  const;
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.post;
    let postContent;

    if (posts === null || loading) {
      postContent = <Loader />;
    } else {
      postContent = <PostFeed posts={posts} />;
    }
    return <div>{postContent}</div>;
  }
}

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts })(Posts);
