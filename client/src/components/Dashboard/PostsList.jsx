import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import Tooltip from "@material-ui/core/Tooltip";
import { deletePost } from "../../actions/postActions";
import Popover from "@material-ui/core/Popover";

class PostsList extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 1,
      postsPerPage: 5,
      isOpen: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.openPopover = this.openPopover.bind(this);
    this.closePopover = this.closePopover.bind(this);
  }

  handleClick(e) {
    this.setState({
      currentPage: Number(e.target.id)
    });
  }

  openPopover = e => {
    this.setState({
      isOpen: e.currentTarget
    });
  };

  closePopover = e => {
    this.setState({
      isOpen: null
    });
  };

  handleDeletePost = id => {
    this.props.deletePost(id);
    this.setState({
      isOpen: null
    });
  };
  render() {
    const { posts, auth } = this.props;
    const { currentPage, postsPerPage, isOpen } = this.state;

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const postsList = currentPosts.map(post => {
      if (post.user === auth.user.id) {
        return (
          <tr key={post._id}>
            <td>
              <Link to={`post/${post._id}`}>{post.title}</Link>
            </td>
            <td>
              <Moment format="DD / MM / YYYY">{post.created_at}</Moment>
            </td>
            <td>
              <div className="ck-action">
                <Tooltip title="Edit" placement="top" enterDelay={300}>
                  <Link to="">
                    <i className="fas fa-edit " />
                  </Link>
                </Tooltip>
                <Tooltip title="delete" placement="top" enterDelay={300}>
                  <i onClick={this.openPopover} className="fas fa-trash " />
                </Tooltip>
                <Popover
                  className="ck-popover"
                  open={Boolean(this.state.isOpen)}
                  anchorEl={isOpen}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  onBackdropClick={this.closePopover}
                >
                  <div className="ck-popover__wrapper">
                    <p>Are you sure you want to delete this post?</p>
                    <div className="ck-popover__btn">
                      <button
                        onClick={this.handleDeletePost.bind(this, post._id)}
                      >
                        Confirm
                      </button>
                      <button onClick={this.closePopover}>Cancel</button>
                    </div>
                  </div>
                </Popover>
              </div>
            </td>
          </tr>
        );
      }
    });

    const pageNumbers = [];
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
              <th>Created at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{postsList}</tbody>
        </table>
        <ul className="page-numbers">{renderPageNumbers}</ul>
      </div>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostsList);
