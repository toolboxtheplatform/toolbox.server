const mongoose = require('mongoose');

const ToolsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  homePage: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  logoPath: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Tools', ToolsSchema);
