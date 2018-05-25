import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextFieldGroup from "../common/TextFieldGroup";
import { addPost } from "../../actions/postActions";
import { getCategories } from "../../actions/categoryActions";
import CategoriesList from "../common/CategoriesList";

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

class PostForm extends Component {
  constructor(props) {
    super(props);
    const body = convertFromRaw(content);
    this.state = {
      title: "",
      categories: "",
      body,
      errors: {}
    };

    this.onContentStateChange = this.onContentStateChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCategories();
  }

  onChange(e) {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    console.log(this.refs);

    const newPost = {
      title: this.state.title,
      body: this.state.body,
      category: this.refs.form.categories.value,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ body: "" });
  }

  onContentStateChange(body) {
    this.setState({
      body
    });
  }

  render() {
    const { errors, body } = this.state;
    const { categories } = this.props.category;
    console.log(this.state.categories);
    return (
      <div className="container">
        <div className="ck-editor">
          <div className="ck-editor__wrapper">
            <h2>Create your tutorial</h2>
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
              </div>
              <CategoriesList categories={categories} name="categories" />
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

PostForm.propTypes = {
  getCategories: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category,
  errors: state.errors,
  auth: state.auth
});

export default connect(mapStateToProps, { addPost, getCategories })(PostForm);
