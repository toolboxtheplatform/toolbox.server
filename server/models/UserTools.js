const mongoose = require('mongoose');

const UserToolsSchema = new mongoose.Schema({
  userID: {
    type: String,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  homePage: {
    type: String,
    lowercase: true,
    required: true,
  },
  className: {
    type: String,
    lowercase: true,
    required: true,
  },
  logoPath: {
    type: String,
    lowercase: true,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('UserTools', UserToolsSchema);
