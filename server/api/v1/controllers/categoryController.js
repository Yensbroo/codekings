const Category = require('../models/Category');
const errorHandler = require('../utilities/errorHandler');

exports.get_categories = (req, res, next) => {
  const query = Category.find();
  query.sort({created_at: -1});
  query.exec((err, categories) => {
    if(err) return errorHandler.handleAPIError(500, err.message || 'Could not retrieve the categories');
    if(!categories) {
      return errorHandler.handleAPIError(404, 'Categories not found');
    }
    return res.json(categories);
  })
}

exports.create_category = (req, res, next) => {
  const newCategory = new Category(req.body);
  newCategory.save((err, category) => {
    if(err) return errorHandler.handleAPIError(500, 'Could not save the new category', next);
    return res.json(category);
  })
}

