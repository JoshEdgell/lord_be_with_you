const express             = require('express');
const mongoose            = require('mongoose');
const bodyParser          = require('body-parser');
const methodOverride      = require('method-override');
const app                 = express();

// app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static('public'));

const announcementsController = require('./controllers/announcements.js');
app.use('/announcements', announcementsController);
const bulletinsController = require('./controllers/bulletins.js');
app.use('/bulletins', bulletinsController);
const paragraphsController = require('./controllers/paragraphs.js');
app.use('/paragraphs', paragraphsController);
const sermonsController = require('./controllers/sermons.js');
app.use('/sermons', sermonsController);
const songsController = require('./controllers/songs.js');
app.use('/songs', songsController);
const stanzasController = require('./controllers/stanzas.js');
app.use('/stanzas', stanzasController);


app.get('/', (req,res)=>{
  res.render(index.html);
})


const PORT = 3000;

mongoose.connect('mongodb://localhost:27017/lord');

mongoose.connection.once('open', ()=>{
  console.log('Michael Scott, extension ' + PORT + '.');
});

app.listen(PORT, ()=>{
  console.log('Dunder Mifflin, this is Pam.');
})
