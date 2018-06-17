const express         = require('express');
const router          = express.Router();
const Bulletins       = require('../models/bulletins.js');

router.get('/', (req, res)=>{
  res.render('bulletins/index.ejs');
});

router.post('/', (req,res)=>{
  res.send('bulletin created');
})

router.get('/new', (req, res)=>{
  res.render('bulletins/new.ejs');
})

module.exports = router;
