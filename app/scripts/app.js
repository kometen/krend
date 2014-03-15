'use strict';

var app = angular.module('krendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'firebase',
  'xeditable'
]);

app.run(function(editableOptions){
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/participants.html',
        controller: 'ParticipantsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'AuthCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
.constant('FIREBASE_URL', 'https://blistering-fire-966.firebaseio.com/');
