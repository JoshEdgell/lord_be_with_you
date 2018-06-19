const mongoose = require('mongoose');
const Stanza = require('./stanzas.js');

const songSchema = mongoose.Schema({
  title: String,
  lyrics: [Stanza.schema],
  copyrightInfo: String
});

const Song = mongoose.model('Song',songSchema);

module.exports = Song;
