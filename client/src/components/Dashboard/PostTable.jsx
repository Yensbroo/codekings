import React, { Component } from "react";
import PropTypes from "prop-types";
import PostList from "./PostList";

class PostTable extends Component {
  render() {
    const { posts } = this.props;
    const postsList = posts.map(post => {
      return <PostList key={post._id} post={post} />;
    });
    return (
      <div className="ck-user__posts-wrapper">
        <h3>Your tutorials</h3>
        {postsList}
      </div>
    );
  }
}

PostTable.propTypes = {
  posts: PropTypes.object.isRequired
};

export default PostTable;
