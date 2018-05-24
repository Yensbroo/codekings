import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class PostsList extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      postsPerPage: 5
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }
  render() {
    const { posts, auth } = this.props;
    const { currentPage, postsPerPage } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const previousPage = currentPage - 1;
    const nextPage = currentPage + 1;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const postsList = currentPosts.map(post => {
      if (post.user === auth.user.id) {
        return (
          <tr key={post._id}>
            <td>
              <Link to={`post/${post._id}`}>{post.title}</Link>
            </td>
            <td>{post.date}</td>
            <td>actions</td>
          </tr>
        );
      }
    });

    const pageNumbers = [];
    console.log(pageNumbers);
    for (let i = 1; i <= Math.ceil(posts.length / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map(number => {
      return (
        <li
          key={number}
          id={number}
          className="pagination"
          onClick={this.handleClick}
        >
          {number}
        </li>
      );
    });

    return (
      <div className="ck-dashboard__posts">
        <h1>Your tutorials</h1>
        <table>
          <thead>
            <tr className="header">
              <th>Title</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{postsList}</tbody>
        </table>
        {pageNumbers.length === 1 ? null : (
          <ul className="page-numbers">{renderPageNumbers}</ul>
        )}
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PostsList);
