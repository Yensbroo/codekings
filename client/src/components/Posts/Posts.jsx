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
        <div className="ck-feed__header">
          <div className="container">
            <div className="ck-feed__header-content">
              <h1>Expand your knowledge</h1>
              <p>
                Codekings is a community-based tutorial platform. <br />You are
                able to create or find the tutorial that you want!
              </p>
              <SearchBox />
            </div>
          </div>
        </div>
        <div className="ck-feed">
          <div className="container">
            <PostFeed />
          </div>
        </div>
        <button className="ck-top" onClick={this.scrollToTop.bind(this)}>
          <i className="fas fa-chevron-up" />
        </button>
      </InstantSearch>
    );
  }
}

export default Posts;
