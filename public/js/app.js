const app = angular.module('LordApp', []);


//Something like the following code may be what's needed to get the text of a song lyric to wrap lines.
// function echoInput() {
//    var txtBox = document.getElementById("inputbox");
//    var lines = txtBox.value.split("\n");
//    var resultString  = "<p>";
//   for (var i = 0; i < lines.length; i++) {
//         resultString += lines[i] + "<br />";
//       }
//    resultString += "</p>";
//    var blk = document.getElementById("results");
//    blk.innerHTML = resultString;
// }

app.controller('AppController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/'
  // Data
  this.allSongs = [];
  this.allSermons = [];
  this.allServices = [];
  this.newSongData = {};
  this.newSermonData = {};
  this.newSongVerse = '';
  this.newSermonParagraph = '';
  this.date = '';
  this.newService = {
    date: '',
    praiseMusic: [],
    sermon: {},
    announcements: [],
    closingMusic: []
  };
  this.showAddEditModal = false;
  // Song
  this.showNewSongModal = false;
  this.showNewSongStart = true;
  // Sermon
  this.showNewSermonModal = false;
  // Service
  this.showStartButton = true;
  this.showAddDate = false;
  this.showAddMusic = false;
  this.showAddSermon = false;
  this.showAddAnnouncements = false;
  this.showAddClosingMusic = false;
  // Song Methods
  this.getAllSongs = function(){
    $http({
      method: 'GET',
      url: this.url + 'songs'
    }).then(
      function(response){
        controller.allSongs = response.data;
      }, function(error){
        console.log(error, 'error from getAllSongs()')
      }
    )
  };
  this.openSongModal = function(){
    this.showNewSongModal = true;
    this.showAddEditModal = true;
  };
  this.startNewSong = function(){
    $http({
      method: 'POST',
      url: this.url + 'songs',
      data: this.newSongData
    }).then(
      function(response){
        console.log(response.data);
        controller.showNewSongStart = false;
        controller.newSongData.copyrightInfo = response.data.copyrightInfo;
        controller.newSongData.songId = response.data._id;
        controller.newSongData.lyrics = response.data.lyrics;
        controller.newSongData.title = response.data.title;
      }, function(error){
        console.log(error, 'error in startNewSong()');
      }
    )
  };
  this.findNewLines = function(string){
    string = string.replace(/\n/g,'');
    return string
  };
  this.addNewStanza = function(){
    this.newSongVerse = this.findNewLines(this.newSongVerse);
    console.log(this.newSongVerse)

    $http({
      method: 'POST',
      url: this.url + 'stanzas',
      data: {
        verse: this.newSongVerse,
        songId: this.newSongData.songId
      }
    }).then(
      function(response){
        controller.newSongData.lyrics = response.data.lyrics;
        controller.newSongVerse = '';
      }, function(error) {
        console.log(error, 'error from addNewStanza()');
      }
    )
  };
  this.addLastStanza = function(){
    this.addNewStanza();
    this.newSongData = {};
    this.showNewSongModal = false;
    this.showAddEditModal = false;
    this.getAllSongs();
  };
  this.addPraiseSong = function(){
    this.newService.praiseMusic.push(this.addingSong);
    this.addingSong = null;
  };
  this.addLastPraiseSong = function(){
    this.showAddMusic = false;
    this.showAddSermon = true;
  }
  this.addClosingSong = function(){
    this.newService.closingMusic.push(this.addingSong);
    this.addingSong = null;
  };
  this.deleteSong = function(id){
    $http({
      method: 'DELETE',
      url: this.url + 'songs/' + id
    }).then(
      function(response){
        controller.getAllSongs();
      }, function(error){
        console.log(error, 'error from deleteSong()');
      }
    )
  };
  // Sermon Methods
  this.getAllSermons = function(){
    $http({
      method: 'GET',
      url: this.url + 'sermons'
    }).then(
      function(response){
        controller.allSermons = response.data;
      }, function(error){
        console.log(error, 'error from getAllSermons()');
      }
    )
  };
  this.openSermonModal = function(){
    this.showAddEditModal = true;
    this.showNewSermonModal = true;
  };
  this.startNewSermon = function(){
    $http({
      method: 'POST',
      url: this.url + 'sermons',
      data: this.newSermonData
    }).then(
      function(response){
        controller.newSermonData.title = response.data.title;
        controller.newSermonData.sermonId = response.data._id;
        controller.newSermonData.body = response.data.body;
      }, function(error){
        console.log(error, 'error from startNewSermon()');
      }
    )
  };
  this.addNewParagraph = function(){
    $http({
      method: 'POST',
      url: this.url + 'paragraphs',
      data: {
        text: this.newSermonParagraph,
        sermonId: this.newSermonData.sermonId
      }
    }).then(
      function(response){
        controller.newSermonData.body = response.data.body;
        controller.newSermonParagraph = '';
      }, function(error){
        console.log(error, 'error from addNewParagraph()');
      }
    )
  };
  this.addLastParagraph = function(){
    this.addNewParagraph();
    this.newSermonData = {};
    this.getAllSermons();
  }
  this.addSermon = function(){
    this.newService.sermon = this.addingSermon;
    this.addingSermon = null;
    this.showAddSermon = false;
    this.showAddAnnouncements = true;
  };
  this.deleteSermon = function(id){
    $http({
      method: 'DELETE',
      url: this.url + 'sermons/' + id
    }).then(
      function(response){
        controller.getAllSermons();
      }, function(error){
        console.log(error, 'error from deleteSermon()');
      }
    )
  };
  // Service Methods
  this.getAllServices = function(){
    $http({
      method: 'GET',
      url: this.url + 'bulletins'
    }).then(function(response){
      controller.allServices = response.data;
    }, function(error){
      console.log(error, 'error from getAllServices()')
    })
  };
  this.startNewService = function(){
    this.showStartButton = false;
    this.showAddDate = true;
  };
  this.addDate = function(){
    this.newService.date = this.date;
    this.date = '';
    this.showAddDate = false;
    this.showAddMusic = true;
  };
  this.addAnnouncement = function(){
    this.newService.announcements.push(this.newAnnouncement);
    this.newAnnouncement = null;
  };
  this.addLastAnnouncement = function(){
    this.showAddAnnouncements = false;
    this.showAddClosingMusic = true;
  };
  this.createService = function(){
    $http({
      method: 'POST',
      url: this.url + 'bulletins',
      data: this.newService
    }).then(
      function(response){
        console.log(response);
        controller.newService = {
          date: '',
          praiseMusic: [],
          sermon: {},
          announcements: [],
          closingMusic: []
        };
        controller.showAddClosingMusic = false;
        controller.getAllServices();
      }, function(error){
        console.log(error, 'error from createdBulletin()');
      }
    )
  };
  this.deleteService = function(id){
    $http({
      method: 'DELETE',
      url: this.url + 'bulletins/' + id
    }).then(function(response){
      controller.getAllServices();
    }, function(error){
      console.log(error, 'error from deleteService()');
    })
  };

  this.getAllSongs();
  this.getAllSermons();
  this.getAllServices();
}])
