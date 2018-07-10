const express         = require('express');
const router          = express.Router();
const Bulletin        = require('../models/bulletins.js');

router.get('/', (req,res)=>{
  Bulletin.find({}, (err, foundBulletins)=>{
    res.json(foundBulletins);
  })
});

router.post('/', (req,res)=>{
  Bulletin.create(req.body, (err, createdBulletin)=>{
    res.json(createdBulletin);
  })
});

router.delete('/:id', (req,res)=>{
  Bulletin.findByIdAndRemove(req.params.id, ()=>{
    res.statusMessage = 'Service Deleted';
    res.status(204).json();
  })
})

module.exports = router;
