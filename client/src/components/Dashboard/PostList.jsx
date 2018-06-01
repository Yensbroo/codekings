import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deletePost } from "../../actions/postActions";
import { deleteFavorite } from "../../actions/favoriteActions";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";

class PostList extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleClick(e) {
    this.setState({
      isOpen: e.currentTarget
    });
  }
  handleClose() {
    this.setState({
      isOpen: null
    });
  }
  delete(id) {
    this.props.deleteFavorite(id);
    this.props.deletePost(id);
  }
  render() {
    const { post } = this.props;
    const { isOpen } = this.state;

    return (
      <div className="ck-user__posts">
        <h2>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h2>
        <p>
          <Moment fromNow>{post.created_at}</Moment>
        </p>
        <div className="ck-user__posts-actions">
          <Tooltip title="Edit">
            <Link to={`/post/update/${post._id}`}>
              <i className="fas fa-edit" />
            </Link>
          </Tooltip>
          <Tooltip title="Delete">
            <i className="fas fa-trash" onClick={this.handleClick} />
          </Tooltip>
          <Popover
            open={Boolean(isOpen)}
            anchorEl={isOpen}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right"
            }}
            className="ck-popover"
            onBackdropClick={this.handleClose}
          >
            <div className="ck-popover__wrapper">
              <p>Are you sure you want to delete this tutorial?</p>
              <div className="ck-popover__btn">
                <button onClick={this.delete.bind(this, post._id)}>
                  Confirm
                </button>
                <button onClick={this.handleClose}>Cancel</button>
              </div>
            </div>
          </Popover>
        </div>
        <div className="clearer" />
        <hr />
      </div>
    );
  }
}

PostList.propTypes = {
  deletePost: PropTypes.func.isRequired,
  deleteFavorite: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, { deletePost, deleteFavorite })(
  PostList
);
