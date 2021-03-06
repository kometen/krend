'use strict';

var app = angular.module('krendApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'xeditable',
  'ui.bootstrap',
  'firebase',
  'angular-momentjs',
  'mgcrea.ngStrap'
]);

//app.run(function(editableOptions){
//  editableOptions.theme = 'bs3'; // bootstrap3 theme
//});

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/active_race.html',
        controller: 'ActiveRaceCtrl'
      })
      .when('/participants', {
        templateUrl: 'views/participants.html',
        controller: 'ParticipantsCtrl'
      })
      .when('/clubs', {
        templateUrl: 'views/clubs.html',
        controller: 'ClubsCtrl'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/races', {
        templateUrl: 'views/races.html',
        controller: 'RacesCtrl'
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
