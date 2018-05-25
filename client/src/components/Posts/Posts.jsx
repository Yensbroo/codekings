import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loading from "../common/Loader";
import PostFeed from "./PostFeed";
import Loader from "../common/Loader";
import "instantsearch.css/themes/reset.css";
import { InstantSearch, Hits, Panel } from "react-instantsearch/dom";
const apiKey = require("../../config/keys").algolia.apiKey;
const appId = require("../../config/keys").algolia.appId;

class Posts extends Component {
  render() {
    return (
      <InstantSearch appId={appId} apiKey={apiKey} indexName="tutorials">
        <div className="container">
          <PostFeed />
        </div>
      </InstantSearch>
    );
  }
}

export default Posts;
