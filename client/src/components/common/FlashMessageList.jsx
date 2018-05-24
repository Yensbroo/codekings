import React, { Component } from "react";
import PropTypes from "prop-types";
import FlashMessage from "./FlashMessage";
import { connect } from "react-redux";

class FlashMessageList extends Component {
  render() {
    const messages = this.props.messages.map(message => (
      <FlashMessage key={message.id} message={message} />
    ));
    return <div>{messages}</div>;
  }
}

FlashMessage.propTypes = {
  messages: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  messages: state.flashMessages
});

export default connect(mapStateToProps)(FlashMessageList);
