const mongoose = require('mongoose');

const paragraphSchema = mongoose.Schema({
  text: String,
  sermonId: String
});

const Paragraph = mongoose.model('Paragraph', paragraphSchema);

module.exports = Paragraph;
