const mongoose = require('mongoose');

const UserToolsSchema = new mongoose.Schema({
  toolName: {
    type: String,
    required: true
  },
  toolID: {
    type: String
  },
  userID: {
    type: String
  }
}, { timestamps: true });

module.exports = mongoose.model('UserTools', UserToolsSchema);
