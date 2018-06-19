const mongoose  = require('mongoose');
const Paragraph = require('./paragraphs.js');

const sermonSchema = mongoose.Schema({
  title: String,
  body: [Paragraph.schema]
})

const Sermon = mongoose.model('Sermon', sermonSchema);

module.exports = Sermon;
