import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import TextAreaGroup from "../common/TextAreaGroup";
import InputGroup from "../common/InputGroup";
import { changeAvatar } from "../../actions/authActions";
import Subnav from "../Navbar/SubNav";

class setAvatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: "",
      avatarFile: "",
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { user } = this.props.auth;
    this.setState({
      avatar: `/uploads/${user.avatar}`
    });
  }
  onChange(e) {
    const state = this.state;
    switch (e.target.name) {
      case "postHeader":
        {
          if (e.target.files && e.target.files[0]) {
            let reader = new FileReader();
            reader.onload = event => {
              this.setState({
                avatar: event.target.result
              });
            };
            reader.readAsDataURL(e.target.files[0]);
          }
          state.avatarFile = e.target.files[0];
        }
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
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { avatarFile } = this.state;
    let formData = new FormData();

    formData.append("postHeader", avatarFile);

    this.props.changeAvatar(formData);
  }

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    return (
      <div>
        <Subnav />
        <div className="container">
          <div className="ck-dashboard">
            <div className="edit-profile__container">
              <div className="edit-profile__header edit-profile__top-header">
                <h1>Change your avatar</h1>
              </div>
              <form onSubmit={this.onSubmit}>
                <div className="edit-profile__wrapper">
                  <div className="edit-profile__form">
                    <div className="edit-profile__avatar">
                      <img src={this.state.avatar} />
                      <input
                        type="file"
                        name="postHeader"
                        onChange={this.onChange}
                      />
                    </div>
                  </div>
                </div>
                <hr />
                <div className="edit-profile__wrapper">
                  <div className="edit-profile__submit">
                    <button>Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

setAvatar.PropTypes = {
  changeAvatar: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { changeAvatar })(setAvatar);
