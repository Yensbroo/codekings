import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactTable from "react-table";
import "../../../node_modules/react-table/react-table.css";
import { connect } from "react-redux";
import PostsList from "./PostsList";

class PostsList extends Component {
  render() {
    const { posts, auth } = this.props;
    console.log(posts.user);

    const postsList = posts.map(post => {
      if (post.user === auth.user.id) {
        return <PostsList />;
      }
    });
    return (
      <div>
        <PostsList />
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostsList);
