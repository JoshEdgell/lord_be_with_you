const express = require('express');
const router  = express.Router();
const Song    = require('../models/songs.js');

//This route is used on the clergy side
router.get('/', (req,res)=>{
  Song.find({}, (err, foundSongs)=>{
    res.json(foundSongs);
  })
});

//This route is used on the clergy side
router.post('/', (req,res)=>{
  Song.create(req.body, (err, createdSong)=>{
    res.json(createdSong);
  })
});

router.get('/:id', (req,res)=>{
  Song.findById(req.params.id, (err, foundSong)=>{
    res.json(foundSong);
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
