import React, { Component } from "react";
import PropTypes from "prop-types";

class CategoriesList extends Component {
  render() {
    const { categories, name, label, value, onChange, error } = this.props;

    const categoriesList = categories.map(category => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
    return (
      <div>
        <label>{label}</label>
        <select name={name} onChange={onChange} value={value}>
          <option value="" selected disabled hidden>
            Choose here
          </option>
          {categoriesList}
        </select>
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoriesList;
