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

router.post('/', (req, res)=>{
  Announcement.create(req.body, (err, createdAnnouncement)=>{
    res.redirect('/announcements');
  })
});

router.get('/new', (req,res)=>{
  res.render('annoucements/new.ejs');
});

router.get('/:id', (req,res)=>{
  Announcement.findById(req.params.id, (err, foundAnnouncement)=>{
    res.send(foundAnnouncement);
  })
});

router.delete('/:id', (req,res)=>{
  Announcement.findByIdAndRemove(req.params.id, ()=>{
    res.redirect('/announcements');
  })
})

module.exports = router;
