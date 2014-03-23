'use strict';

app.controller('ActiveRaceCtrl', function ($location, $scope, $window, Race, User, ActiveRace) {

	$scope.updateRace = function (raceId, race) {
		Race.update(raceId, race);
	};

	$scope.currentUser = function () {
		User.getCurrent();
	};

	$scope.selectRace = function (raceId, race) {
		$window.alert('Selected race: ' + race.name + ', raceId: '+ raceId);
		ActiveRace.setRace(raceId, race);
		$location.path('/#');
	};

	$scope.races = Race.all;

	$scope.tabs = [
		{ title: 'Available Races', content: 'Set active race from the list below'},
		{ title: 'Dynamic Title 2', content: 'Dynamic content 2', disabled: true }
	];

	$scope.alertMe = function () {
		setTimeout(function () {
			$window.alert('You\'ve selected the alert tab!');
		});
	};
	
});
