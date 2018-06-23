const app = angular.module('LordApp', []);

app.controller('AppController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/'
  this.showNewSongForm = true;
  this.showNewSermonForm = true;
  this.allSongs = [];
  this.allSermons = [];
  this.newSongData = {};
  this.newSermonData = {};
  this.newSongVerse = '';
  this.newSermonParagraph = '';
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
        // console.log(response, 'response from getAllSermons()');
      }, function(error){
        console.log(error, 'error from getAllSermons()');
      }
    )
  };
  this.startNewSong = function(){
    this.showNewSongForm = false;
    $http({
      method: 'POST',
      url: this.url + 'songs',
      data: this.newSongData
    }).then(
      function(response){
        // console.log(response,'response')
        controller.newSongData.copyrightInfo = response.data.copyrightInfo;
        controller.newSongData.songId = response.data._id;
        controller.newSongData.lyrics = response.data.lyrics;
        controller.newSongData.title = response.data.title;
        // console.log(controller.newSongData, 'new song');
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
        // console.log(controller.newSongData.lyrics, 'newSongData.lyrics')
        // console.log(controller.newSongData, 'newSongData');
      }, function(error) {
        console.log(error, 'error from addNewStanza()');
      }
    )
  };
  this.addLastStanza = function(){
    this.addNewStanza;
    this.showNewSongForm = true;
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
  this.startNewSermon = function(){
    this.showNewSermonForm = false;
    $http({
      method: 'POST',
      url: this.url + 'sermons',
      data: this.newSermonData
    }).then(
      function(response){
        controller.newSermonData.title = response.data.title;
        controller.newSermonData.sermonId = response.data._id;
        controller.newSermonData.body = response.data.body;
        console.log(controller.newSermonData, 'new sermon');
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
        // console.log(response, 'response from addNewParagraph()');
        // console.log(controller.newSermonData, 'new sermon data');
      }, function(error){
        console.log(error, 'error from addNewParagraph()');
      }
    )
  };
  this.addLastParagraph = function(){
    this.addNewParagraph;
    this.showNewSermonForm = true;
    this.newSermonData = {};
    this.getAllSermons();
  }
  this.getAllSongs();
  this.getAllSermons();
}])
