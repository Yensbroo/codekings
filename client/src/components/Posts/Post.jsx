import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { convertToRaw } from "draft-js";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import { getPost } from "../../actions/postActions";
import PostBody from "./PostBody";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  render() {
    const { auth } = this.props.auth;
    const { post, loading } = this.props.post;
    console.log(post.body);

    let postContent;

    if (post === null || loading || Object.keys(post).length === 0) {
      postContent = <Loader />;
    } else {
      postContent = (
        <div>
          <div className="ck-post-detail__header">
            {!post.image ? null : (
              <figure>
                <img
                  src={`/uploads/${post.image}`}
                  className="ck-post__image"
                />
              </figure>
            )}

            <div className="container">
              <div className="ck-post-detail__title">
                <h1>{post.title}</h1>
                <div className="ck-post-detail__date">
                  <span>Posted: </span>
                  <Moment fromNow>{post.created_at}</Moment>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="ck-post-detail__container">
              <div className="ck-post-detail__user">
                <div className="ck-post-detail__user-wrapper">
                  <div className="ck-post-detail__user-info">
                    <img
                      src={post.avatar}
                      alt={post.name}
                      className="ck-avatar"
                    />
                    <h4>{post.name}</h4>
                  </div>
                </div>
              </div>
              <div className="ck-post-detail__body">
                <div className="ck-post-detail__wrapper">
                  <PostBody body={post.body} />
                </div>
              </div>
            </div>
            <div className="ck-comment__container">
              <h4>Comments: {post.comments.length}</h4>
              <CommentForm postId={post._id} />
              <CommentFeed postId={post._id} comments={post.comments} />
            </div>
          </div>
        </div>
      );
    }
    return <div className="ck-post-detail">{postContent}</div>;
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
