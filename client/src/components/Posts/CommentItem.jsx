import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
import Moment from "react-moment";
import Popover from "@material-ui/core/Popover";

class CommentItem extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClick = e => {
    this.setState({
      isOpen: e.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      isOpen: null
    });
  };
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
    this.setState({
      isOpen: null
    });
  }
  render() {
    const { comment, auth, postId } = this.props;
    const { isOpen } = this.state;
    return (
      <div className="ck-comment">
        <div className="ck-comment__wrapper">
          <div className="ck-comment__user">
            <img src={`/uploads/${comment.avatar}`} alt="" />
            <div className="ck-comment__info">
              <Link to={`/profile/${comment.user}`}>{comment.name}</Link>
              <Moment fromNow className="commentDate">
                {comment.date}
              </Moment>
            </div>
          </div>
          {comment.user === auth.user.id ? (
            <div>
              <button onClick={this.handleClick} className="ck-delete">
                Delete
              </button>
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
                  <p>Are you sure you want to delete this comment?</p>
                  <div className="ck-popover__btn">
                    <button
                      onClick={this.onDeleteClick.bind(
                        this,
                        postId,
                        comment._id
                      )}
                    >
                      Confirm
                    </button>
                    <button onClick={this.handleClose}>Cancel</button>
                  </div>
                </div>
              </Popover>
            </div>
          ) : null}

          <div className="ck-comment__text">
            <p>{comment.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
