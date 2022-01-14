const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avi: String,
  bio: String,
  img: String,
  caption: String
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);

module.exports = Content;