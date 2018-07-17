const app = angular.module('LordApp', []);

app.controller('AppController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/'
  this.showStartButton = true;
  this.showAddDate = false;
  this.showAddMusic = false;
  this.showAddSermon = false;
  this.showAddAnnouncements = false;
  this.showAddClosingMusic = false;
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
  this.startNewSong = function(){
    $http({
      method: 'POST',
      url: this.url + 'songs',
      data: this.newSongData
    }).then(
      function(response){
        controller.newSongData.copyrightInfo = response.data.copyrightInfo;
        controller.newSongData.songId = response.data._id;
        controller.newSongData.lyrics = response.data.lyrics;
        controller.newSongData.title = response.data.title;
      }, function(error){
        console.log(error, 'error in startNewSong()');
      }
    )
  };
  this.addNewStanza = function(){
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
    this.getAllSongs();
  }
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
  this.addDate = function(){
    this.newService.date = this.date;
    this.date = '';
    this.showAddDate = false;
    this.showAddMusic = true;
  };
  this.addPraiseSong = function(){
    this.newService.praiseMusic.push(this.addingSong);
    this.addingSong = null;
  };
  this.addLastPraiseSong = function(){
    this.showAddMusic = false;
    this.showAddSermon = true;
  }
  this.addSermon = function(){
    this.newService.sermon = this.addingSermon;
    this.addingSermon = null;
    this.showAddSermon = false;
    this.showAddAnnouncements = true;
  };
  this.addAnnouncement = function(){
    this.newService.announcements.push(this.newAnnouncement);
    this.newAnnouncement = null;
  };
  this.addLastAnnouncement = function(){
    this.showAddAnnouncements = false;
    this.showAddClosingMusic = true;
  };
  this.addClosingSong = function(){
    this.newService.closingMusic.push(this.addingSong);
    this.addingSong = null;
  };
  this.createBulletin = function(){
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
  this.getAllSongs();
  this.getAllSermons();
  this.getAllServices();
}])
