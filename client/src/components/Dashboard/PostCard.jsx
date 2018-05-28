import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PostCard extends Component {
  render() {
    const { posts } = this.props;

    const postsList = posts.map(post => {
      <div
        key={post._id}
        className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
      >
        <div className="ck-post__card">
          <div className="ck-post__image">
            <div className="ck-post__actions">
              <div className="ck-post__favorite">
                <i className="far fa-heart" />
              </div>
              <div className="ck-post__likes">
                <i className="fas fa-thumbs-up" />
                <span>{post.likes.length}</span>
                <i className="fas fa-thumbs-down" />
              </div>
            </div>
            <Link to={`/post/${post._id}`}>
              <img src={post.header} alt="test" />
            </Link>
          </div>
          <div className="ck-post__info">
            <div className="ck-post__title">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </div>
            <div className="ck-post__author">
              <span>{post.name}</span>
            </div>
          </div>
        </div>
      </div>;
    });

    return (
      <div className="container">
        <div className="row">{postsList}</div>
      </div>
    );
  }
}

PostCard.propTypes = {
  posts: PropTypes.array.isRequired
};
export default PostCard;
