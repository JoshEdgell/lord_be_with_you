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

router.get('/new', (req,res)=>{
  res.render('songs/new.ejs');
});

router.post('/', (req,res)=>{
  Song.create(req.body, (err, createdSong)=>{
    res.redirect('/songs');
  })
});

module.exports = router;
