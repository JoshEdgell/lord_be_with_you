const express       = require('express');
const app           = express();

app.get('/bulletin/new', (req,res)=>{
  res.send('new');
})

app.listen(3000, ()=>{
  console.log('Dunder Mifflin, this is Pam');
})
