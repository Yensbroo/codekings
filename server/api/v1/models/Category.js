const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema ({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    required: false
  }
})

module.exports = Category = mongoose.model('categories', CategorySchema);