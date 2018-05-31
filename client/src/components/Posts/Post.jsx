import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import classnames from "classnames";
import { convertToRaw } from "draft-js";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import { getPost, likePost, unlikePost } from "../../actions/postActions";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import PostBody from "./PostBody";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      isLiked: false
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props.auth;
    if (nextProps.post.post.likes) {
      const likes = nextProps.post.post.likes;

      if (likes.filter(like => like.user === user.id).length > 0) {
        this.setState({
          isLiked: true
        });
      }
    }
  }

  like(id) {
    if (this.state.isLiked) {
      this.props.unlikePost(id);
      this.setState({
        isLiked: false
      });
    } else {
      this.props.likePost(id);
      this.setState({
        isLiked: true
      });
    }
  }

  render() {
    const { user } = this.props.auth;
    const { isLiked } = this.state.isLiked;
    const { post, loading } = this.props.post;
    console.log(post);

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
                      src={`/uploads/${user.avatar}`}
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
                  <hr />
                  <div className="ck-post__actions">
                    <h3>
                      Like this tutorial? Leave a nice comment or show your
                      appreciation
                    </h3>
                    <button
                      className={
                        "ck-like " +
                        (!this.state.isLiked ? "ck-isNotLiked" : "ck-isLiked")
                      }
                      onClick={this.like.bind(this, post._id)}
                    >
                      <i className="far fa-heart" />
                    </button>
                    <span>{post.likes.length}</span>
                    <div className="ck-post__socials">
                      <i className="fab fa-twitter" />
                      <FacebookShareButton
                        url={`http://localhost:3000/post/${post._id}`}
                      >
                        <i className="fab fa-facebook-square" />
                      </FacebookShareButton>
                      <i className="fab fa-twitter" />
                    </div>
                  </div>
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
  likePost: PropTypes.func.isRequired,
  unlikePost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { getPost, likePost, unlikePost })(
  Post
);
