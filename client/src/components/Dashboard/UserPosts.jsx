import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getUserPosts } from "../../actions/postActions";
import PostTable from "./PostTable";
import Subnav from "../Navbar/SubNav";

class UserPosts extends Component {
  componentDidMount() {
    this.props.getUserPosts();
  }
  render() {
    const { posts } = this.props.post;
    let dashboardContent;
    console.log(posts);

    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-user__posts-container">
            <PostTable posts={posts} />
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
