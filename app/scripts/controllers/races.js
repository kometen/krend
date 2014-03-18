'use strict';

app.controller('RacesCtrl', function ($scope, $location, Race) {
	if ($location.path() === '/races') {
		$scope.races = Race.all;
	}
	
	$scope.submitRace = function () {
		Race.create($scope.race).then(function () {
			$scope.race = {name: '', date: '', location: ''};
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

	// Disable weekend selection
	$scope.disabled = function(date, mode) {
		return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
	};

	$scope.toggleMin = function() {
		$scope.minDate = ( $scope.minDate ) ? null : new Date();
	};
	$scope.toggleMin();

	$scope.open = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.opened = true;
	};

	$scope.dateOptions = {
		'year-format': 'yy',
		'starting-day': 1
	};

	$scope.formats = ['dd-MM-yyyy', 'yyyy/MM/dd', 'shortDate'];
	$scope.format = $scope.formats[0];
	
});
