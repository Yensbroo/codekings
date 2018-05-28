import React from "react";
import { Link } from "react-router-dom";
import { connectInfiniteHits } from "react-instantsearch/connectors";
import PostCard from "./PostCard";

/*const PostFeed = props => {
  const items = props.hits.map(hit => {
    <PostCard hit={hit} />;
  });

  return <div>{items}</div>;
};*/

const PostFeed = connectInfiniteHits(({ hits }) => (
  <div className="row">
    {hits.map(hit => <PostCard key={hit.objectID} hit={hit} />)}
  </div>
));

export default PostFeed;
