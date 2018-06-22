const express = require('express');
const router  = express.Router();
const Song    = require('../models/songs.js');

//This route is used on the clergy side
router.get('/', (req,res)=>{
  Song.find({}, (err, foundSongs)=>{
    res.json(foundSongs);
  })
});

router.get('/new', (req,res)=>{
  res.render('songs/new.ejs');
});


//This route is used on the clergy side
router.post('/', (req,res)=>{
  Song.create(req.body, (err, createdSong)=>{
    res.json(createdSong);
  })
});

router.get('/:id', (req,res)=>{
  Song.findById(req.params.id, (err,foundSong)=>{
    res.render('songs/show.ejs', {
      song: foundSong
    });
  })
});

router.get('/:id/edit', (req,res)=>{
  Song.findById(req.params.id, (err, foundSong)=>{
    res.render('songs/edit.ejs', {
      song: foundSong
    });
  })
});

router.put('/:id', (req,res)=>{
  Song.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/songs');
  })
});

//This route is used on the clergy side
router.delete('/:id', (req,res)=>{
  Song.findByIdAndRemove(req.params.id, ()=>{
    res.send('song deleted');
  })
})

module.exports = router;
