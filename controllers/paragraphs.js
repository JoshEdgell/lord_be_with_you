const express   = require('express');
const router    = express.Router();
const Paragraph = require('../models/paragraphs.js');
const Sermon    = require('../models/sermons.js');

router.get('/', (req,res)=>{
  Paragraph.find({}, (err, foundParagraphs)=>{
    res.json(foundParagraphs);
  });
});

//This route is ready to be used on the app
router.post('/', (req,res)=>{
  Sermon.findById(req.body.sermonId, (err,foundSermon)=>{
    Paragraph.create(req.body, (err,createdParagraph)=>{
      foundSermon.body.push(createdParagraph);
      foundSermon.save((err,data)=>{
        res.json(foundSermon);
      })
    })
  })
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
