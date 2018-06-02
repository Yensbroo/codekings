import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUserPosts } from "../../actions/postActions";
import PostTable from "./PostTable";
import Subnav from "../Navbar/SubNav";

class UserPosts extends Component {
  componentDidMount() {
    this.props.getUserPosts();
  }
  render() {
    const { posts } = this.props.post;
    console.log(posts);
    let userpostsContent;

    if (Object.keys(posts).length === 0) {
      userpostsContent = (
        <h3>
          It looks like you haven't made a tutorial yet!{" "}
          <Link to="/create-tutorial">Create one now</Link>
        </h3>
      );
    } else {
      userpostsContent = <PostTable posts={posts} />;
    }

    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-user__posts-container">
            <div className="ck-user__posts-wrapper">
              <h3>Your tutorials</h3>
              {userpostsContent}
            </div>
          </div>
        </div>
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
