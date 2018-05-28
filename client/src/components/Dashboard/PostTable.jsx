import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostCard from "./PostCard";
import { getPosts } from "../../actions/postActions";

class PostTable extends Component {
  render() {
    const { posts, auth } = this.props;
    const postsList = posts.map(post => {
      return <PostCard key={post._id} />;
    });
    return (
      <div>
        <PostCard />
      </div>
    );
  }
}

PostTable.propTypes = {
  posts: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostTable);
