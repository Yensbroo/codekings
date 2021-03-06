import React from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

const PostCard = ({ hit }) => {
  return (
    <div
      key={hit._id}
      className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
    >
      <div className="ck-post__card">
        <div className="ck-post__image">
          <Link to={`/post/${hit.objectID}`}>
            <img src={`/uploads/${hit.image}`} alt="test" />
            <div className="overlay" />
          </Link>
        </div>
        <div className="ck-post__info">
          <div className="ck-post__title">
            <Link to={`/post/${hit.objectID}`}>{hit.title}</Link>
          </div>
          <div className="ck-post__author">
            <Link to={`/profile/${hit.user}`}>{hit.name}</Link>
            <br />
            <span className="ck-date">
              <Moment fromNow>{hit.created_at}</Moment>
            </span>
          </div>
          <hr />
          <div className="ck-post__stats">
            <span>
              <i className="fas fa-comment" />
              {hit.comments.length}
            </span>
            <span>
              <i className="fas fa-heart" />
              {hit.likes.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
