const express   = require('express');
const router    = express.Router();
const Paragraph = require('../models/paragraphs.js');
const Sermon    = require('../models/sermons.js');

router.get('/', (req,res)=>{
  Paragraph.find({}, (err, foundParagraphs)=>{
    res.render('paragraphs/index.ejs', {
      paragraphs: foundParagraphs
    });
  });
});

router.get('/new', (req,res)=>{
  res.render('paragraphs/new.ejs');
});

router.post('/', (req,res)=>{
  Paragraph.create(req.body, (err, createdParagraph)=>{
    res.redirect('paragraphs');
  });
});

router.get('/:id', (req,res)=>{
  Paragraph.findById(req.params.id, (err,foundParagraph)=>{
    res.render('paragraphs/show.ejs', {
      paragraph: foundParagraph
    });
  });
});

router.get('/:id/edit', (req,res)=>{
  Paragraph.findById(req.params.id, (err,foundParagraph)=>{
    res.render('paragraphs/edit.ejs', {
      paragraph: foundParagraph
    });
  });
});

router.put('/:id', (req,res)=>{
  Paragraph.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/stanzas');
  });
});

router.delete('/:id', (req,res)=>{
  Paragraph.findByIdAndRemove(req.params.id, ()=>{
    res.redirect('/paragraphs');
  });
});

module.exports = router;
