const express         = require('express');
const router          = express.Router();

router.get('/', (req, res)=>{
  res.render('bulletins/index.ejs');
});

router.get('/new', (req, res)=>{
  res.render('bulletins/new.ejs');
})

module.exports = router;
