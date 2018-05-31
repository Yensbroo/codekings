import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ hit }) => {
  return (
    <div
      key={hit._id}
      className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12"
    >
      <div className="ck-post__card">
        <div className="ck-post__image">
          <Link to={`/post/${hit._id}`}>
            <div className="overlay" />
            <img src={`/uploads/${hit.image}`} alt="test" />
          </Link>
        </div>
        <div className="ck-post__info">
          <div className="ck-post__title">
            <Link to={`/post/${hit._id}`}>{hit.title}</Link>
          </div>
          <div className="ck-post__author">
            <span>{hit.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
