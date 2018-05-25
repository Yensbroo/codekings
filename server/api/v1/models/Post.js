const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoolia = require('mongoolia').default;

const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  header: {
    type: String,
    default: 'https://images.unsplash.com/photo-1502951682449-e5b93545d46e?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=86dcc4a537932173561d30a24657fdc3&auto=format&fit=crop&w=966&q=80'
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
  tutorialId: {
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
