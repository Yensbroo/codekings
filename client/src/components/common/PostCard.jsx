import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class PostCard extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="ck-post__card">
          <div className="ck-post__image">
            <Link to={`/post/${post._id}`}>
              <img src={`/uploads/${post.image}`} alt="test" />
            </Link>
          </div>
          <div className="ck-post__info">
            <div className="ck-post__title">
              <Link to={`/post/${post._id}`}>{post.title}</Link>
            </div>
            <div className="ck-post__author">
              <Link to={`/profile/${post.user}`}>{post.name}</Link>
              <br />
              <span className="ck-date">
                <Moment fromNow>{post.created_at}</Moment>
              </span>
            </div>
            <hr />
            <div className="ck-post__stats">
              <span>
                <i className="fas fa-comment" />
                {post.comments.length}
              </span>
              <span>
                <i className="fas fa-heart" />
                {post.likes.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.object.isRequired
};
export default PostCard;
