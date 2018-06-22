const app = angular.module('LordApp', []);

app.controller('AppController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/'
  this.showNewSongForm = true;
  this.allSongs = [];
  this.newSongData = {};
  this.newSongVerse = '';
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
  this.getAllSongs();
}])
