import React, { Component } from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

class FlashMessage extends Component {
  render() {
    const { id, type, text } = this.props.message;
    return (
      <div
        className={classnames("flash", {
          "flash-success": type === "success",
          "flash-danger": type === "error"
        })}
      >
        {text}
      </div>
    );
  }
}

FlashMessage.propTypes = {
  message: PropTypes.object.isRequired
};

export default FlashMessage;
