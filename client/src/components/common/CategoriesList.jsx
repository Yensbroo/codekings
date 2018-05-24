import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getCategories } from "../../actions/categoryActions";

class CategoriesList extends Component {
  constructor() {
    super();
    this.state = {
      selectValue: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  render() {
    const { categories } = this.props;

    const categoriesList = categories.map(category => (
      <option key={category._id} value={category._id}>
        {category.name}
      </option>
    ));
    return (
      <select value={this.state.selectValue} onChange={this.handleChange}>
        {categoriesList}
      </select>
    );
  }
}

CategoriesList.propTypes = {
  categories: PropTypes.array.isRequired
};

export default CategoriesList;
