const express = require('express');
const router  = express.Router();
const Song    = require('../models/songs.js');
const Stanza  = require('../models/stanzas.js');

router.get('/', (req,res)=>{
  Stanza.find({}, (err, foundStanzas)=>{
    res.render('stanzas/index.ejs', {
      stanzas: foundStanzas
    });
  })
});

router.get('/new', (req,res)=>{
  res.render('stanzas/new.ejs');
});

router.post('/', (req,res)=>{
  Stanza.create(req.body, (err, createdStanza)=>{
    res.redirect('stanzas');
  });
});

router.get('/:id', (req,res)=>{
  Stanza.findById(req.params.id, (err,foundStanza)=>{
    res.render('stanzas/show.ejs', {
      stanza: foundStanza
    });
  })
});

router.get('/:id/edit', (req,res)=>{
  Stanza.findById(req.params.id, (err, foundStanza)=>{
    res.render('stanzas/edit.ejs', {
      stanza: foundStanza
    });
  })
});

router.put('/:id', (req,res)=>{
  Stanza.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/stanzas');
  })
});

router.delete('/:id', (req,res)=>{
  Stanza.findByIdAndRemove(req.params.id, ()=>{
    res.redirect('/stanzas');
  })
});

module.exports = router;
