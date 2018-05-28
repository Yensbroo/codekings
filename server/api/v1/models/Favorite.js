const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  post: {
    type: Schema.Types.ObjectId,
    ref: 'post'
  },
  favorited_at: {
    type: Date,
    default: Date.now,
  }
})

module.exports = Favorite = mongoose.model('favorites', FavoriteSchema);