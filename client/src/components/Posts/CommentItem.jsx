import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/postActions";
import Moment from "react-moment";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }
  render() {
    const { comment, auth, postId } = this.props;
    return (
      <div className="ck-comment ">
        <div className="ck-comment__wrapper">
          <div className="ck-comment__user">
            <img src={comment.avatar} alt="" />
            <div className="ck-comment__info">
              <Link to={`/profile/${comment.user}`}>{comment.name}</Link>
              <Moment fromNow className="commentDate">
                {comment.date}
              </Moment>
            </div>
          </div>
          {comment.user === auth.user.id ? (
            <button
              onClick={this.onDeleteClick.bind(this, postId, comment._id)}
              className="ck-delete"
            >
              Delete
            </button>
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
