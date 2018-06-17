const express             = require('express');
const mongoose            = require('mongoose');
const bodyParser          = require('body-parser');
const app                 = express();

app.use(bodyParser.urlencoded({extended:false}));

const bulletinsController = require('./controllers/bulletins.js');
app.use('/bulletins', bulletinsController);

app.get('/', (req,res)=>{
  res.render('index.ejs');
})


const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/lord');

mongoose.connection.once('open', ()=>{
  console.log('Michael Scott, extension ' + PORT + '.');
});

app.listen(PORT, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
})
