const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoolia = require('mongoolia').default;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  image: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: {},
    required: true,
  },
  name: {
    type: String,
  },
  objectID: {
    type: String,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'categories'
  },
  avatar: {
    type: String,
  },
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users",
      },
      text: {
        type: String,
        required: true,
  
      },
      name: {
        type: String,
  
      },
      avatar: {
        type: String,
  
      },
     created_at: {
        type: Date,
        default: Date.now,

      }
    }
  ],
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
});

module.exports = Post = mongoose.model("post", PostSchema);
