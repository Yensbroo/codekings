import React from "react";
import { connectInfiniteHits } from "react-instantsearch/connectors";
import InfiniteScroll from "react-infinite-scroller";
import PostCard from "./PostCard";

const PostFeed = connectInfiniteHits(({ hits, hasMore, refine }) => (
  <InfiniteScroll loadMore={refine} hasMore={hasMore}>
    <div className="row">
      {hits.map(hit => <PostCard key={hit.objectID} hit={hit} />)}
    </div>
  </InfiniteScroll>
));

export default PostFeed;
