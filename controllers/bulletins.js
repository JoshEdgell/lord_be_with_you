const express         = require('express');
const router          = express.Router();

router.get('/', (req, res)=>{
  res.render('bulletins/index.ejs');
});

module.exports = router;
