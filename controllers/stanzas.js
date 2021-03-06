const express = require('express');
const router  = express.Router();
const Song    = require('../models/songs.js');
const Stanza  = require('../models/stanzas.js');

router.get('/', (req,res)=>{
  Stanza.find({}, (err, foundStanzas)=>{
    res.json(foundStanzas);
  })
});

//This route is used on the clergy side
router.post('/', (req,res)=>{
  Song.findById(req.body.songId, (err, foundSong)=>{
    Stanza.create(req.body, (err, createdStanza)=>{
      foundSong.lyrics.push(createdStanza);
      foundSong.save((err,data)=>{
        res.json(foundSong);
      })
    })
  })
});

router.get('/:id', (req,res)=>{
  Stanza.findById(req.params.id, (err,foundStanza)=>{
    res.json(foundStanza)
  })
});

// router.get('/:id/edit', (req,res)=>{
//   Stanza.findById(req.params.id, (err, foundStanza)=>{
//     res.render('stanzas/edit.ejs', {
//       stanza: foundStanza
//     });
//   })
// });

router.put('/:id', (req,res)=>{
  Stanza.findByIdAndUpdate(req.params.id, req.body, ()=>{
  })
});

router.delete('/:id', (req,res)=>{
  Stanza.findByIdAndRemove(req.params.id, ()=>{
  })
});

module.exports = router;
