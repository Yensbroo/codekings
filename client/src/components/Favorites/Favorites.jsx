import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getFavorites } from "../../actions/favoriteActions";
import FavoriteFeed from "./FavoriteFeed";

class UserFavorites extends Component {
  componentDidMount() {
    this.props.getFavorites();
  }
  render() {
    const { favorites } = this.props.favorite;
    let favoritesContent;
    console.log(favorites);

    if (Object.keys(favorites).length === 0) {
      favoritesContent = (
        <div className="container">
          <h1>You have no favorites yet</h1>
        </div>
      );
    } else {
      favoritesContent = <FavoriteFeed favorites={favorites} />;
    }

    return <div className="ck-favorites__container">{favoritesContent}</div>;
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
