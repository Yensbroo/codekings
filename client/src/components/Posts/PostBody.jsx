import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import redraft, { createStylesRenderer, createBlockRenderer } from "redraft";

const styleMap = {
  BOLD: {
    fontWeight: "bold"
  },
  ITALIC: {
    fontStyle: "italic"
  },
  UNDERLINE: {
    textDecoration: "underline"
  }
};

const InlineWrapper = ({ children, style, key }) => (
  <span key={key} style={style}>
    {children}
  </span>
);

const blockRenderMap = {
  unstyled: {
    element: "p"
  },
  blockquote: {
    element: "blockquote"
  },
  "ordered-list-item": {
    element: "li",
    wrapper: "ol"
  },
  "unordered-list-item": {
    element: "li",
    wrapper: "ul"
  },
  "header-one": {
    element: "h1"
  },
  "header-two": {
    element: "h2"
  },
  "header-three": {
    element: "h3"
  },
  "header-four": {
    element: "h4"
  },
  "header-five": {
    element: "h5"
  },
  "header-six": {
    element: "h6"
  },
  "code-block": {
    element: "pre"
  }
};

const renderers = {
  styles: createStylesRenderer(InlineWrapper, styleMap),
  blocks: createBlockRenderer(React.createElement, blockRenderMap),
  entities: {
    LINK: (children, data, { key }) => (
      <Link key={key} to={data.url} target="_blank">
        {children}
      </Link>
    ),
    IMAGE: (children, entity, { key }) => (
      <img key={key} src={entity.src} alt="" />
    )
  }
};

const options = {
  cleanup: {
    after: "all",
    types: "all",
    split: true
  }
};

export default class PostBody extends Component {
  renderWarning() {
    return <div>Nothing to render</div>;
  }
  render() {
    const { body } = this.props;
    if (!body) {
      return this.renderWarning();
    }
    const rendered = redraft(body, renderers, options);
    if (!rendered) {
      return this.renderWarning();
    }
    return <div>{rendered}</div>;
  }
}

PostBody.propTypes = {
  body: PropTypes.object.isRequired
};
