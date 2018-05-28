import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFavorites } from "../../actions/favoriteActions";
//import PostCard from "./PostCard";
import Subnav from "../Navbar/SubNav";

class UserFavorites extends Component {
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    const { favorites } = this.props.favorite;
    console.log(favorites);
    let dashboardContent;

    return (
      <div>
        <Subnav />
      </div>
    );
  }
}

UserFavorites.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  favorite: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  favorite: state.favorite
});

export default connect(mapStateToProps, { getFavorites })(UserFavorites);
