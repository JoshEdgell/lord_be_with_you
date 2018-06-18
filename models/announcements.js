const mongoose = require('mongoose');

const announcementSchema = mongoose.Schema({
  text: String
});

const Announcement = mongoose.model('Announcement', announcementSchema);

module.exports = Announcement;
