const mongoose          = require('mongoose');

//Date
//Songs
//Sermon
//Announcements - Done
//Closing Songs

const bulletinSchema = mongoose.Schema({
  date: Date,
  praiseMusic: Array,
  sermon: Array,
  Announcements: Array,
  closingMusic: Array
});

const Bulletin = mongoose.model('Bulletin',bulletinSchema);

module.exports = Bulletin;
