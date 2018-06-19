const app = angular.module('LordApp', []);

app.controller('AppController', ['$http', function($http){
  const controller = this;
  this.word = 'poop';
}])
