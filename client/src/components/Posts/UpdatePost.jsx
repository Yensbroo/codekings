import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextFieldGroup from "../common/TextFieldGroup";
import { updatePost, getPost } from "../../actions/postActions";
import { getCategories } from "../../actions/categoryActions";
import CategoriesList from "../common/CategoriesList";
import isEmpty from "../../validation/is-empty";

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ]
};

class UpdatePost extends Component {
  constructor(props) {
    super(props);
    const body = convertFromRaw(content);
    this.state = {
      title: "",
      category: "",
      postHeader: "",
      body,
      errors: {}
    };

    this.onContentStateChange = this.onContentStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
    this.props.getPost(this.props.match.params.id);
  }

  onChange(e) {
    const state = this.state;
    switch (e.target.name) {
      case "postHeader":
        state.postHeader = e.target.files[0];
        break;
      case "categories":
        state.category = e.target.value;
        break;
      default:
        state[e.target.name] = e.target.value;
    }
    this.setState(state);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.post.post) {
      const post = nextProps.post.post;

      post.title = !isEmpty(post.title) ? post.title : "";
      post.category = !isEmpty(post.category) ? post.category : "";

      this.setState({
        title: post.title,
        category: post.category._id,
        body: post.body
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { title, body, postHeader, category } = this.state;
    let formData = new FormData();
    const parsedBody = JSON.stringify(body);
    formData.append("title", title);
    formData.append("body", parsedBody);
    formData.append("postHeader", postHeader);
    formData.append("category", category);

    this.props.updatePost(
      this.props.match.params.id,
      formData,
      this.props.history
    );
    this.setState({ body: "" });
  }

  onContentStateChange(body) {
    this.setState({
      body
    });
  }

  render() {
    const { errors } = this.state;
    const { categories } = this.props.category;
    return (
      <div className="container">
        <div className="ck-editor">
          <div className="ck-editor__wrapper">
            <h2>Update your tutorial</h2>
            <form ref="form" onSubmit={this.onSubmit}>
              <div className="ck-editor__title">
                <TextFieldGroup
                  label="Title"
                  placeholder="Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                />
                <label>Upload a post header</label>
                <input name="postHeader" type="file" onChange={this.onChange} />
                <div className="invalid-feedback">{errors.image}</div>
              </div>
              <CategoriesList
                categories={categories}
                name="categories"
                label="Category"
                value={this.state.category}
                onChange={this.onChange}
                error={errors.category}
              />
              <div className="ck-editor__categories" />
              <div className="ck-editor__body">
                <label>Tutorial content</label>
                <Editor
                  wrapperClassName="ck-editor__body-wrapper"
                  editorClassName="ck-editor__body-editor"
                  toolbarClassName="ck-editor__body-toolbar"
                  onContentStateChange={this.onContentStateChange}
                  name="body"
                  toolbar={{
                    options: [
                      "inline",
                      "blockType",
                      "fontSize",
                      "list",
                      "textAlign",
                      "colorPicker",
                      "link",
                      "embedded",
                      "emoji",
                      "image",
                      "remove",
                      "history"
                    ],
                    blockType: { inDropdown: true },
                    fontFamily: false
                  }}
                />
                <div className="invalid-feedback">{errors.body}</div>
              </div>
              <div className="ck-editor__btn">
                <button>Submit tutorial</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

UpdatePost.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
  updatePost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  errors: state.errors,
  auth: state.auth,
  post: state.post
});

export default connect(mapStateToProps, { updatePost, getCategories, getPost })(
  withRouter(UpdatePost)
);
