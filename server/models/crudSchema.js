const mongoose = require("mongoose");

// user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  work: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
});

// model

const User = mongoose.model("User", userSchema);

// export
module.exports = User;
