const mongoose = require('mongoose');

const stanzaSchema = mongoose.Schema({
  verse: String,
  songId: String
});

const Stanza = mongoose.model('Stanza',stanzaSchema);

module.exports = Stanza;
