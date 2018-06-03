import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import Loader from "../common/Loader";
import { getPost, likePost, unlikePost } from "../../actions/postActions";
import {
  addFavorite,
  getFavorites,
  deleteFavorite
} from "../../actions/favoriteActions";
import { FacebookShareButton, TwitterShareButton } from "react-share";
import PostBody from "./PostBody";
import Moment from "react-moment";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

class Post extends Component {
  constructor() {
    super();
    this.state = {
      isLiked: false,
      isFavorite: false
    };
  }
  componentDidMount() {
    this.props.getPost(this.props.match.params.id);
    this.props.getFavorites();
    // const { user } = this.props.auth;
    // const { favorites } = this.props.favorite;
    // if (
    //   favorites.filter(favorite => favorite.user === user.id).length > 0 &&
    //   favorites.filter(favorite => favorite.post === this.props.match.params.id)
    //     .length > 0
    // ) {
    //   this.setState({
    //     isFavorite: true
    //   });
    // }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = this.props.auth;
    const { post } = this.props.post;
    if (nextProps.post.post.likes) {
      const likes = nextProps.post.post.likes;

      if (likes.filter(like => like.user === user.id).length > 0) {
        this.setState({
          isLiked: true
        });
      }
    }
    //console.log(this.props.match.params.id);
    if (nextProps.favorite.favorites) {
      const favorites = nextProps.favorite.favorites;
      //console.log(favorites);

      const favoritePost = favorites.filter(favorite => {
        return (
          favorite.user === user.id &&
          favorite.post._id === this.props.match.params.id
        );
      });
      console.log(favoritePost);
      if (Object.keys(favoritePost).length > 0) {
        this.setState({
          isFavorite: true
        });
      }

      // if (favorites.post.id === this.props.match.params.id) {
      //   console.log(true);
      // }
      // favorites.filter(favorite => {
      //   console.log(favorite.post.id);
      //   if (
      //     favorite.post.id === this.props.match.params.id //&&
      //     //favorite.user === user.id
      //   ) {
      //     console.log(favorite);
      //     // this.setState({
      //     //   isFavorite: true
      //     // });
      //   }
      // });
    }
  }

  favorite(postId) {
    const { post } = this.props.post;

    const favoriteData = {
      postId: post._id
    };
    if (this.state.isFavorite) {
      this.props.deleteFavorite(post._id);
      this.setState({
        isFavorite: false
      });
    } else {
      this.props.addFavorite(favoriteData);
      this.setState({
        isFavorite: true
      });
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
    const { isLiked, isFavorite } = this.state;
    const { post, loading } = this.props.post;

    console.log(isFavorite);

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
                  alt=""
                />
              </figure>
            )}

            <div className="container">
              <div className="ck-post-detail__title">
                <h1>{post.title}</h1>
                {!post.category ? null : (
                  <span className="ck-category">{post.category.name}</span>
                )}

                <div className="ck-post-detail__stats">
                  <span>
                    <i className="fas fa-comments" />
                    {post.comments.length}
                  </span>
                  <span>
                    <i className="fas fa-heart" />
                    {post.likes.length}
                  </span>
                </div>
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
                      src={`/uploads/${post.avatar}`}
                      alt={post.name}
                      className="ck-avatar"
                    />
                    <h4>
                      <Link to={`/profile/${post.user}`}>{post.name}</Link>
                    </h4>
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
                        "ck-like " + (!isLiked ? "ck-isNotLiked" : "ck-isLiked")
                      }
                      onClick={this.like.bind(this, post._id)}
                    >
                      <i className="far fa-heart" />
                    </button>
                    <span>{post.likes.length}</span>
                    <div className="ck-post__socials">
                      <TwitterShareButton
                        url="www.google.be"
                        title={post.title}
                      >
                        <i
                          className="fab fa-twitter"
                          title="Share on twitter"
                        />
                      </TwitterShareButton>
                      <FacebookShareButton
                        url={`www.google.com`}
                        quote={post.title}
                      >
                        <i
                          className="fab fa-facebook-square"
                          title="Share on facebook"
                        />
                      </FacebookShareButton>

                      <button
                        className="ck-favorite"
                        onClick={this.favorite.bind(this, post._id)}
                        title="Favorite"
                      >
                        <i
                          className={
                            isFavorite ? "fas fa-bookmark" : "far fa-bookmark"
                          }
                        />
                      </button>
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
  addFavorite: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  getFavorites: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  favorite: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post,
  favorite: state.favorite
});

export default connect(mapStateToProps, {
  getPost,
  likePost,
  unlikePost,
  addFavorite,
  getFavorites,
  deleteFavorite
})(withRouter(Post));
