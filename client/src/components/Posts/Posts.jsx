import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Loading from "../common/Loader";
import PostFeed from "./PostFeed";
import Loader from "../common/Loader";
import { InstantSearch, SearchBox, Configure } from "react-instantsearch/dom";
const apiKey = require("../../config/keys").algolia.apiKey;
const appId = require("../../config/keys").algolia.appId;

class Posts extends Component {
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  render() {
    return (
      <InstantSearch appId={appId} apiKey={apiKey} indexName="tutorials">
        <div className="container">
          <label className="search-label">
            <SearchBox />
          </label>
          <PostFeed />
        </div>
        <button className="ck-top" onClick={this.scrollToTop.bind(this)}>
          <i className="fas fa-chevron-up" />
        </button>
      </InstantSearch>
    );
  }
}

export default Posts;
