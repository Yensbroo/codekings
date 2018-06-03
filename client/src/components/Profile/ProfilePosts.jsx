import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostCard from "../common/PostCard";

class ProfilePosts extends Component {
  render() {
    const { posts, name } = this.props;
    const postsList = posts.map(post => {
      return <PostCard key={post._id} post={post} />;
    });
    return (
      <div>
        <h3>Tutorials by {name}</h3>
        <div className="row">{postsList}</div>
      </div>
    );
  }
}

ProfilePosts.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProfilePosts);
