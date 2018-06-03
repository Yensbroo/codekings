import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class FavoriteCard extends Component {
  render() {
    const { favorite } = this.props;

    return (
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="ck-post__card">
          <div className="ck-post__image">
            <Link to={`/post/${favorite.post._id}`}>
              <img src={`/uploads/${favorite.post.image}`} alt="test" />
              <div className="overlay" />
            </Link>
          </div>
          <div className="ck-post__info">
            <div className="ck-post__title">
              <Link to={`/post/${favorite.post._id}`}>
                {favorite.post.title}
              </Link>
            </div>
            <div className="ck-post__author">
              <Link to={`/profile/${favorite.post.user}`}>
                {favorite.post.name}
              </Link>
              <br />
              <span className="ck-date">
                <Moment fromNow>{favorite.post.created_at}</Moment>
              </span>
            </div>
            <hr />
            <div className="ck-post__stats">
              <span>
                <i className="fas fa-comment" />
                {favorite.post.comments ? favorite.post.comments.length : 0}
              </span>
              <span>
                <i className="fas fa-heart" />
                {favorite.post.likes ? favorite.post.likes.length : 0}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FavoriteCard.propTypes = {
  favorite: PropTypes.object.isRequired
};
export default FavoriteCard;
