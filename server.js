const express            = require('express');
const app                = express();

app.get('/', (req,res)=>{
  res.render('index.ejs');
})


const PORT = 3000;

app.listen(PORT, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
  console.log('Michael Scott, extension ' + PORT);
})
