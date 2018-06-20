const app = angular.module('LordApp', []);

app.controller('AppController', ['$http', function($http){
  const controller = this;
  this.url = 'http://localhost:3000/'
  this.showNewSongForm = true;
  this.newSongData = {};
  this.startNewSong = function(){
    this.showNewSongForm = false;
    $http({
      method: 'POST',
      url: this.url + 'songs',
      data: this.newSongData
    }).then(
      function(response){
        // console.log(response,'response')
        controller.newSongData = response.data;
        console.log(controller.newSongData, 'new song');
      }, function(error){
        console.log(error, 'error');
      }
    )
  };
  this.addNewStanza = function(){
    console.log('clicked');
  };
}])
