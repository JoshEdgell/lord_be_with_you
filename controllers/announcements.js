const express             = require('express');
const router              = express.Router();
const Announcement        = require('../models/announcements.js');

router.get('/', (req,res)=>{
  res.render('annoucements/index.ejs');
});

router.post('/', (req, res)=>{
  Announcement.create(req.body, (err, createdAnnouncement)=>{
    res.redirect('/annoucements');
  })
});

router.get('/new', (req,res)=>{
  res.render('annoucements/new.ejs');
});

module.exports = router;
