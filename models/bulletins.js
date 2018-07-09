const mongoose          = require('mongoose');
const Song              = require('./songs.js');
const Sermon            = require('./sermons.js');

//Date
//Songs - Done
//Sermon
//Announcements - Done
//Closing Songs - Done

const bulletinSchema = mongoose.Schema({
  date: String,
  praiseMusic: [Song.schema],
  sermon: Sermon.schema,
  announcements: Array,
  closingMusic: [Song.schema]
});

const Bulletin = mongoose.model('Bulletin',bulletinSchema);

module.exports = Bulletin;
