const mongoose = require("mongoose");
const mongoolia = require('mongoolia').default;
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'https://image.ibb.co/hdY3gT/profiel.png'
  },
  role: {
    type: String,
    default: 'user'
  },
  password: {
    type: String,
    required: true,
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
});

module.exports = User = mongoose.model("users", UserSchema);
