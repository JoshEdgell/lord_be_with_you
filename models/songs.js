const mongoose            = require('mongoose');

const songSchema = mongoose.Schema({
  title: String,
  lyrics: String,
  copyrightInfo: String
});

const Song = mongoose.model('Song',songSchema);

module.exports = Song;
