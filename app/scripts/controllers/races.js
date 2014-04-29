'use strict';

app.controller('RacesCtrl', function ($scope, $location, Race, $moment) {
	if ($location.path() === '/races') {
		$scope.races = Race.all;
	}
	
	$scope.submitRace = function () {
		console.log('time: ' + $moment($scope.race.time));
		Race.create($scope.race).then(function () {
			$scope.race = {name: '', date: '', time: '', interval: '', location: ''};
		});
	};

	$scope.updateRace = function (raceId, race) {
		Race.update(raceId, race);
	};

	$scope.deleteRace = function (raceId) {
		Race.delete(raceId);
	};

	$scope.today = function() {
		$scope.dt = new Date();
	};

	$scope.today();

	$scope.showWeeks = true;
	$scope.toggleWeeks = function () {
		$scope.showWeeks = ! $scope.showWeeks;
	};

	$scope.clear = function () {
		$scope.dt = null;
	};

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		'year-format': 'yy',
		'starting-day': 1
	};

});
