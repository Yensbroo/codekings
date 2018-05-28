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
    const { favorites } = this.props.favorites;
    let dashboardContent;
    console.log(favorites);

    return (
      <div>
        <Subnav />
      </div>
    );
  }
}

UserFavorites.propTypes = {
  getFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  favorites: state.favorites
});

export default connect(mapStateToProps, { getFavorites })(UserFavorites);
