import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../actions/categoryActions";

class CategoriesList extends Component {
  render() {
    const { categories, name } = this.props;

    const categoriesList = categories.map(category => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
    return <select name={name}>{categoriesList}</select>;
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoriesList;
