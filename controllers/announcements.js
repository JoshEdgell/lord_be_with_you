const express             = require('express');
const router              = express.Router();
const Announcement        = require('../models/announcements.js');

router.get('/', (req,res)=>{
  Announcement.find({}, (err, foundAnnouncements)=>{
    res.render('annoucements/index.ejs', {
      announcements: foundAnnouncements
    });
  })
});

router.get('/new', (req,res)=>{
  res.render('annoucements/new.ejs');
});

router.post('/', (req, res)=>{
  Announcement.create(req.body, (err, createdAnnouncement)=>{
    res.redirect('/announcements');
  })
});

router.get('/:id', (req,res)=>{
  Announcement.findById(req.params.id, (err, foundAnnouncement)=>{
    res.send(foundAnnouncement);
  })
});

router.get('/:id/edit', (req,res)=>{
  Announcement.findById(req.params.id, (err, foundAnnouncement)=>{
    res.render('annoucements/edit.ejs', {
      announcement: foundAnnouncement
    });
  })
});

router.put('/:id', (req,res)=>{
  Announcement.findByIdAndUpdate(req.params.id, req.body, ()=>{
    res.redirect('/announcements');
  })
});

router.delete('/:id', (req,res)=>{
  Announcement.findByIdAndRemove(req.params.id, ()=>{
    res.redirect('/announcements');
  })
})

module.exports = router;
