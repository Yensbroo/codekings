import React, { Component } from "react";
import PropTypes from "prop-types";
import FavoriteCard from "./FavoriteCard";

class FavoriteFeed extends Component {
  render() {
    const { favorites } = this.props;
    const favoritesList = favorites.map(favorite => {
      return <FavoriteCard key={favorite._id} favorite={favorite} />;
    });
    return (
      <div>
        <div className="container">
          <div className="row">{favoritesList}</div>
        </div>
      </div>
    );
  }
}

FavoriteFeed.propTypes = {
  favorites: PropTypes.array.isRequired
};

export default FavoriteFeed;
