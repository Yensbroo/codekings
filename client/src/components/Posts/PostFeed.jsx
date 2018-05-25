import React from "react";
import { Link } from "react-router-dom";
import { connectHits } from "react-instantsearch/connectors";
import PostCard from "./PostCard";

const PostFeed = props => {
  const items = props.hits.map(hit => {
    <PostCard hit={hit} />;
  });

  return <div>{items}</div>;
};

export default connectHits(PostFeed);
