import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class FavoriteCard extends Component {
  render() {
    const { favorite } = this.props;

    return (
      <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12">
        <div className="ck-post__card">
          <div className="ck-post__image">
            <Link to={`/post/${favorite.post._id}`}>
              <img src={`/uploads/${favorite.post.image}`} alt="test" />
            </Link>
          </div>
          <div className="ck-post__info">
            <div className="ck-post__title">
              <Link to={`/post/${favorite.post._id}`}>
                {favorite.post.title}
              </Link>
            </div>
            <div className="ck-post__author">
              <span>{favorite.post.name}</span>
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
