const express = require('express');
const router  = express.Router();
const Sermon  = require('../models/sermons.js');

//This route is used on the clergy side
router.get('/', (req,res)=>{
  Sermon.find({}, (err, foundSermons)=>{
    res.json(foundSermons);
  })
});

router.post('/', (req,res)=>{
  Sermon.create(req.body, (err, createdSermon)=>{
    res.json(createdSermon);
  })
});

router.get('/:id', (req,res)=>{
  Sermon.findById(req.params.id, (err, foundSermon)=>{
    res.json(foundSermon);
  })
});

router.delete('/:id', (req,res)=>{
  Sermon.findByIdAndRemove(req.params.id, ()=>{
    res.statusMessage = 'Sermon Deleted';
    res.status(204).json();
  })
});

module.exports = router;
