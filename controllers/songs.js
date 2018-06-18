const express         = require('express');
const router          = express.Router();
const Song            = require('../models/songs.js');

router.get('/', (req,res)=>{
  Song.find({}, (err, foundSongs)=>{
    res.render('songs/index.ejs', {
      songs: foundSongs
    });
  })
});

module.exports = router;
